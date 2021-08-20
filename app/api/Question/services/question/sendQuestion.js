const { Question } = require("../../../../../models");
const userFinder = require("../../../../shared/userFinder");

const sendQuestionService = async ({ user, body }) => {
  const { userId, text, annonymous } = body;

  const userOfQuestion = await userFinder.findById(userId);
  if (!userOfQuestion)
    return {
      error: "No users found",
      status: 404,
    };

  let question = await Question.create({
    userId: userOfQuestion.id,
    askerUserId: user.id,
    text,
    annonymous,
  });

  return {
    message: "Your question has been sent",
    data: question,
  };
};

module.exports = sendQuestionService;
