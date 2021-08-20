const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.sendQuestionSchema = {
  userId: Joi.number().integer().positive().required(),
  text: Joi.string().max(5000).required(),
  annonymous: Joi.boolean().required(),
};

exports.viewMyQuestionsSchema = {
  page: Joi.number().integer().positive().optional(),
  limit: Joi.number().integer().positive().optional(),
  answerd: Joi.boolean().required(),
};

exports.viewMySentQuestionsSchema = {
  page: Joi.number().integer().positive().optional(),
  limit: Joi.number().integer().positive().optional(),
};

exports.answerQuestionSchema = {
  questionId: Joi.number().integer().positive().required(),
  answer: Joi.string().max(50000).required(),
};
