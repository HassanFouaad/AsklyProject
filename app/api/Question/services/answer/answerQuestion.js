const { Question, User } = require("../../../../../models");
const { Op } = require("sequelize");
const { createPostService } = require("../../../Post/services");
const answerQuestionService = async ({ user, body }) => {
  const { questionId, answer } = body;
  let question = await Question.findOne({
    where: {
      answer: {
        [Op.eq]: null,
      },
      id: questionId,
      userId: user.id,
    },
    include: [
      {
        model: User,
        as: "asker",
        attributes: ["id", "firstName", "lastname", "image"],
      },
      {
        model: User,
        as: "user",
        attributes: ["id", "firstName", "lastname", "image"],
      },
    ],
  });

  if (!question)
    return {
      error: "Invalid question id, deleted or answered",
      status: 404,
    };

  await question.update({ answer });
  question = question.toJSON();

  if (question.annonymous) {
    delete question.asker;
    delete question.askerUserId;
  }
  createPostService({
    user: { id: user.id },
    body: { questionId: question.id },
  });
  return {
    message: "Question has been updated",
    data: question,
  };
};

module.exports = answerQuestionService;
