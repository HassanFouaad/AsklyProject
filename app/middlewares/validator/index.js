const Joi = require("joi");

const validator = (schemaToValidate) => (req, res, next) => {
  const schema = Joi.object(schemaToValidate).options({ abortEarly: false });

  const { query, body, method } = req;

  if (method == "DELETE" || method == "GET") {
    let { error } = schema.validate(query);
    if (error) {
      return res.status(422).json({
        error: {
          type: "query validation",
          key: error.details[0].context.key,
          message: error.details[0].message,
        },
        status: 422,
      });
    } else {
      next();
    }
  } else if (method == "POST" || method == "PUT") {
    let { error } = schema.validate(body, { abortEarly: false });
    if (error) {
      return res.status(422).json({
        error: {
          inputErrors: error.details,
        },
        status: 422,
      });
    }
    next();
  }
};

module.exports = validator;
