const {
    Question
} = require("../../../../../models")

const PaginationHelper = require('../../../../shared/pagination')
const viewMySentQuestionsService = async ({
    user,
    query
}) => {
    let questions = await Question.find({
        questionUser: user.id,
        answer: {
            $exists: true
        }
    }, null, new PaginationHelper(query)).populate({
        path: 'user',
        select: 'firstName lastName image'
    }).sort({
        createdAt: -1
    })
    return {
        data: questions
    }
}

module.exports = viewMySentQuestionsService