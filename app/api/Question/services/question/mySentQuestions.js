const { Question, User, Post } = require("../../../../../models");
const { Op } = require("sequelize");
const paginationwithCondition = require("../../../../shared/pagination");
const getFileFromAWS = require("../../../../shared/AWS/getFile");
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
  questions.paginated.result = await Promise.all(
    questions.paginated.result.map(async (q) => {
      if (q.asker)
        if (q.asker.image) q.asker.image = await getFileFromAWS(q.asker.image);

      if (q.user)
        if (q.user.image)
          q.user.image = await getFileFromAWS(question.user.image);

      return q;
    })
  );
  return {
    data: questions.paginated,
  };
};

module.exports = viewMySentQuestionsService;
