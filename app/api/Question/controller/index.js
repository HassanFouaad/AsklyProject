const {
    sendQuestionService,
    viewMyQuestionsService,
    viewMySentQuestionsService,
    answerQuestionService
} = require("../services")

const {
    controller
} = require("../../../middlewares");


module.exports = {
    sendQuestionController: controller(sendQuestionService),
    viewMyQuestionsController: controller(viewMyQuestionsService),
    viewMySentQuestionsController: controller(viewMySentQuestionsService),
    answerQuestionController:controller(answerQuestionService)
}