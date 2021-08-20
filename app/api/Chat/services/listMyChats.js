const { Chat, User } = require("../../../../models");
const paginationwithCondition = require("../../../shared/pagination");
const { Op } = require("sequelize");
module.exports = listMyChatsService = async ({ user, query }) => {
  let userId = user.id;
  let dbQuery = {
    where: {
      [Op.or]: [{ receiverId: userId }, { creatorId: userId }],
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
  };

  let { paginated } = await paginationwithCondition(Chat, { query }, dbQuery);

  return {
    data: paginated,
    message: "Success",
  };
};
