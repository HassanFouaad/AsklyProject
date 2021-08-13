const Joi = require('joi')

exports.signUpSchema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    about: Joi.string().optional(),
    email: Joi.string().email().required(),
    mobile: Joi.string().required(),
    password: Joi.string().required()
}


exports.signInSchema = {
    email: Joi.string().email().required(),
    password: Joi.string().required()
}