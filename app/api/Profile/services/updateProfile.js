const {
    User
} = require("../../../../models")

const updateProfileService = async ({
    user,
    body,
    files
}) => {
    let data = await User.findByIdAndUpdate(user.id, body, {
        upsert: true,
        new: true
    })

    if (data) {
        data = data.toJSON()
    }

    delete data.hashedPassword
    return {
        data,
        message: "You have updated your profile"
    }
}

module.exports = updateProfileService