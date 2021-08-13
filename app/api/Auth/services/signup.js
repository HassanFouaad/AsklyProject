const {
    User
} = require('../../../../models')
const userFinder = require('../../../shared/userFinder')
const bcrypt = require('bcrypt')
const signUpService = async ({
    body
}) => {
    try {
        const {
            email,
            mobile,
            firstName,
            lastName,
            password
        } = body

        let [mobileExists, emailExists] = await Promise.all([
            userFinder.findByMobile(mobile),
            userFinder.findByEmail(email)
        ])
        if (emailExists) return {
            error: "Email already exists"
        }

        if (mobileExists) return {
            error: "Mobile already exists"
        }
        let hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            email,
            mobile,
            firstName,
            lastName,
            hashedPassword
        })

        return {
            data: user,
            message: "Welcome!"
        }
    } catch (error) {
        console.error(error)
        return {
            error: "Server Error"
        }
    }
}

module.exports = signUpService