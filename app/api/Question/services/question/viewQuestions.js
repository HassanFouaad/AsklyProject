const { Op } = require("sequelize");
const { Question, User } = require("../../../../../models");

const paginationwithCondition = require("../../../../shared/pagination");
const viewMyQuestionsService = async ({ user, query }) => {
  let dbOptions = {
    order: [["createdAt", "desc"]],
    where: {
      userId: user.id,
    },
    include: [
      {
        model: User,
        as: "asker",
        attributes: ["id", "firstName", "lastname", "image", "username"],
      },
      {
        model: User,
        as: "user",
        attributes: ["id", "firstName", "lastname", "image", "username"],
      },
    ],
  };

  if (typeof query.answerd == "undefined") query.answerd = false;

  query.answerd = JSON.parse(query.answerd);

  if (query.answerd) dbOptions.where["answer"] = { [Op.ne]: null };
  else dbOptions.where["answer"] = { [Op.eq]: null };

  let questions = await paginationwithCondition(Question, { query }, dbOptions);

  questions.paginated.result = await Promise.all(
    questions.paginated.result.map((question) => {
      question = question.toJSON();
      if (question.annonymous) {
        delete question.asker;
        delete question.askerUserId;
      }
      return question;
    })
  );

  return {
    data: questions.paginated,
    message: "Success",
  };
};

module.exports = viewMyQuestionsService;
