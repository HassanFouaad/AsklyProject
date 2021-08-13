const sendQuestionService = require('./question/sendQuestion')
const viewMyQuestionsService = require("./question/viewQuestions")
const viewMySentQuestionsService = require('./question/mySentQuestions')
const answerQuestionService = require('./answer/answerQuestion')
module.exports = {
    sendQuestionService,
    viewMyQuestionsService,
    viewMySentQuestionsService,
    answerQuestionService
}