const { Question, User, Post } = require("../../../../../models");
const { Op } = require("sequelize");
const paginationwithCondition = require("../../../../shared/pagination");
const viewMySentQuestionsService = async ({ user, query }) => {
  let dbQuery = {
    where: { askerUserId: user.id, answer: { [Op.ne]: null } },
    order: [["createdAt", "desc"]],
    include: [
      {
        model: User,
        as: "asker",
        attributes: ["id", "firstName", "lastname", "image", "username"],
        required: false,
      },
      {
        model: User,
        as: "user",
        attributes: ["id", "firstName", "lastname", "image", "username"],
        required: false,
      },
      {
        model: Post,
        as: "post",
        required: false,
      },
    ],
  };

  let questions = await paginationwithCondition(Question, { query }, dbQuery);

  return {
    data: questions.paginated,
  };
};

module.exports = viewMySentQuestionsService;
