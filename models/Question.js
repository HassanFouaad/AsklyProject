const {
    Schema,
    model,
} = require("mongoose");

const Question = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: "User",
        required: true,
    },
    questionUser: {
        type: Schema.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        maxLength: 5000,
    },
    answer: {
        type: String,
        maxLength: 50000,
    },
    annonymous: {
        type: Boolean,
        maxLength: 50000,
    }
}, {
    timestamps: true
})

module.exports = model("Question", Question);