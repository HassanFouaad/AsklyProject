const Joi = require("joi");

exports.listMyChatsSchema = {
  page: Joi.number().integer().positive().optional(),
  limit: Joi.number().integer().positive().optional(),
};
exports.sendMessageSchema = {
  userId: Joi.number().integer().positive().required(),
  message: Joi.string().max(50000).required(),
};
