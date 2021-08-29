const { Op } = require("sequelize");
const { Chat, ChatMessage, User } = require("../../../../models");
const getFileFromAWS = require("../../../shared/AWS/getFile");
module.exports = sendMessageService = async ({ user, body }) => {
  const { userId, message } = body;
  const { id: senderId } = user;

  if (senderId == userId) {
    return { error: "You cant chat yourself", status: 400 };
  }
  let userFound = await User.findByPk(userId);
  if (!userFound) return { error: "Invalid user id", status: 404 };

  let chat = await Chat.findOne({
    where: {
      creatorId: { [Op.or]: [senderId, userId] },
      receiverId: { [Op.or]: [senderId, userId] },
    },
    include: [
      {
        model: User,
        as: "creator",
        attributes: ["id", "firstName", "lastname", "image", "username"],
      },
      {
        model: User,
        as: "receiver",
        attributes: ["id", "firstName", "lastname", "image", "username"],
      },
    ],
  });

  if (!chat) {
    chat = await Chat.create({
      lastMessage: message,
      creatorId: senderId,
      receiverId: userId,
    });
    chat = chat.toJSON();
    if (chat.creator) {
      if (chat.creator.image) {
        chat.creator.image = await getFileFromAWS(chat.creator.image);
      }
    }
    if (chat.receiver) {
      if (chat.receiver.image) {
        chat.receiver.image = await getFileFromAWS(chat.receiver.image);
      }
    }
  } else {
    await chat.update({ lastMessage: message });
  }
  let newMessage = await ChatMessage.create({
    message,
    chatId: chat.id,
    userId: senderId,
  });
  newMessage = newMessage.toJSON();
  newMessage["sender"] = {
    id: user.id,
    firstName: user.firstName,
    lastname: user.lastname,
    username: user.username,
    image: user.image,
  };
  newMessage.sender.image = await getFileFromAWS(newMessage.sender.image);

  return {
    data: {
      chat,
      message: newMessage,
    },
  };
};
