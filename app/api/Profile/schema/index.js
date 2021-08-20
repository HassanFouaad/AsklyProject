const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
exports.viewProfileSchema = {
  userId: Joi.number().integer().positive().optional(),
  username: Joi.string().optional(),
};

exports.updateProfileSchema = {
  firstName: Joi.string().optional(),
  lastname: Joi.string().optional(),
  username: Joi.string().optional(),
  about: Joi.string().optional(),
  image: Joi.string().optional(),
};
