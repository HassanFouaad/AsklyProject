const {
    User
} = require('../../models')
class UserFinder {
    async findById(id) {
        let user = await User.findById(id)
        if (!user) return null
        user = user.toJSON()
        delete user.__v
        user.id = user._id
        return user
    }

    async findByMobile(mobile) {
        let user = await User.findOne({
            mobile
        })
        if (!user) return null
        user = user.toJSON()
        delete user.__v
        user.id = user._id
        return user
    }

    async findByEmail(email) {
        let user = await User.findOne({
            email
        })
        if (!user) return null
        user = user.toJSON()
        delete user.__v
        user.id = user._id
        return user
    }
}

module.exports = new UserFinder()