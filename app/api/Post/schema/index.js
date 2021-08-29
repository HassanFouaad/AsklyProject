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

exports.deletePostSchema = {
  postId: Joi.number().integer().positive().required(),
};

exports.togglePostLikeSchema = {
  postId: Joi.number().integer().positive().required(),
};
