const Joi = require('joi')

exports.signUpSchema = {
    firstName: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string().required(),
    about: Joi.string().optional(),
    email: Joi.string().email().required(),
    mobile: Joi.string().optional(),
    password: Joi.string().required()
}


exports.signInSchema = {
    email: Joi.string().email().required(),
    password: Joi.string().required()
}