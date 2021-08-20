const Joi = require("joi");

exports.createPostSchema = {
  text: Joi.string().max(50000).required(),
};

exports.listPostSchema = {
  userId: Joi.number().integer().positive().optional(),
  timeLine: Joi.boolean().optional(),
  page: Joi.number().integer().positive().optional(),
  limit: Joi.number().integer().positive().optional(),
};
