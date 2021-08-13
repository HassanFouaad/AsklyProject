const userFinder = require("../../../shared/userFinder")

const viewProfileService = async ({
    query
}) => {
    const {
        userId
    } = query

    const user = await userFinder.findById(userId)
    if (!user) return {
        error: "User not found",
        status: 404
    }

    delete user.hashedPassword
    return {
        data: user,
        message: 'success'
    }
}
module.exports = viewProfileService