const {
    Schema,
    model
} = require("mongoose");

const User = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
        maxLength: 20,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
        maxLength: 20,
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
    hashedPassword: {
        type: String,
    },
    about: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
    },
}, {
    timestamps: true
})

module.exports = model("User", User);