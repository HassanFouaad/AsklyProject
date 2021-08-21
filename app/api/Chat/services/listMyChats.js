const { Chat, User, ChatMessage } = require("../../../../models");
const paginationwithCondition = require("../../../shared/pagination");
const { Op } = require("sequelize");
const getFileFromAWS = require("../../../shared/AWS/getFile");
const getOneChat = async (query, userId) => {
  let { chatId } = query;
  let dbQuery = {
    where: {
      chatId,
    },
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: User,
        as: "sender",
        attributes: ["id", "firstName", "lastname", "image", "username"],
      },
    ],
  };

  let { paginated } = await paginationwithCondition(
    ChatMessage,
    { query },
    dbQuery
  );
  let chat = await Chat.findOne({
    where: { id: chatId },
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
  chat = chat.toJSON();
  chat.creator.image = await getFileFromAWS(chat.creator.image);
  chat.receiver.image = await getFileFromAWS(chat.receiver.image);

  paginated.result = await Promise.all(
    paginated.result.map(async (chat) => {
      chat.sender.image = await getFileFromAWS(chat.sender.image);
      return chat;
    })
  );
  return {
    data: { chat, messages: paginated },
    message: "Success",
  };
};

module.exports = listMyChatsService = async ({ user, query }) => {
  try {
    let userId = user.id;
    if (query.chatId) return getOneChat(query, userId);
    let dbQuery = {
      where: {
        [Op.or]: [{ receiverId: userId }, { creatorId: userId }],
      },
      order: [["createdAt", "DESC"]],
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
    };

    let { paginated } = await paginationwithCondition(Chat, { query }, dbQuery);
    paginated.result = await Promise.all(
      paginated.result.map(async (chat) => {
        chat.creator.image = await getFileFromAWS(chat.creator.image);
        chat.receiver.image = await getFileFromAWS(chat.receiver.image);
        return chat;
      })
    );
    return {
      data: paginated,
      message: "Success",
    };
  } catch (error) {
    console.error(error);
  }
};
