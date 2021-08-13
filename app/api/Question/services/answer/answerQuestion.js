const {
    Question
} = require("../../../../../models")
const answerQuestionService = async ({
    user,
    body
}) => {
    const {
        questionId,
        answer
    } = body
    let question = await Question.findOne({
        answer: {
            $exists: false
        },
        user: user.id,
        _id: questionId
    })

    if (!question) return {
        error: "Invalid question id, deleted or answered",
        status: 404
    }


    question = await Question.findByIdAndUpdate(questionId, {
        answer
    }, {
        upsert: true,
        new: true
    })

    if (question.annonymous) question.questionUser = undefined
    return {
        message: 'Question has been updated',
        data: question
    }

}

module.exports = answerQuestionService