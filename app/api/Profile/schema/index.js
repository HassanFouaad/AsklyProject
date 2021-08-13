const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
exports.viewProfileSchema = {
    userId: Joi.objectId().required(),
}


exports.updateProfileSchema = {
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    about: Joi.string().optional(),

}