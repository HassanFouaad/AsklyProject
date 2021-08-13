const {
    Question
} = require("../../../../../models")

const PaginationHelper = require('../../../../shared/pagination')
const viewMyQuestionsService = async ({
    user,
    query
}) => {
    let questions = await Question.find({
        user: user.id,
        answer: {
            $exists: query.answerd
        }
    }, null, new PaginationHelper(query)).populate({
        path: 'questionUser',
        select: 'firstName lastName image'
    }).sort({
        createdAt: -1
    })

    questions = await Promise.all(
        questions.map((question) => {
            if (question.annonymous) question.questionUser = undefined
            return question
        })
    )
    return {
        data: questions
    }
}

module.exports = viewMyQuestionsService