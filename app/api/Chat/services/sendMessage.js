const { Op } = require("sequelize");
const { Chat, ChatMessage } = require("../../../../models");
module.exports = sendMessageService = async ({ user, body }) => {
  const { userId, message } = body;
  const { id: senderId } = user;
  if (senderId == userId) {
    return { error: "You cant chat yourself", status: 400 };
  }

  let chat = await Chat.findOne({
    where: {
      creatorId: { [Op.or]: [senderId, userId] },
      receiverId: { [Op.or]: [senderId, userId] },
    },
  });

  if (!chat) {
    chat = await Chat.create({
      lastMessage: message,
      creatorId: senderId,
      receiverId: userId,
    });
    chat = chat.toJSON();
  } else {
    await chat.update({ lastMessage: message });
  }

  return {
    data: chat,
    message: await ChatMessage.create({
      message,
      chatId: chat.id,
      userId: senderId,
    }),
  };
};
