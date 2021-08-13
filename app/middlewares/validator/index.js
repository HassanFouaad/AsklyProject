const Joi = require("joi");

const validator = (schemaToValidate) => (req, res, next) => {
    const schema = Joi.object(schemaToValidate);

    const {
        query,
        body,
        method
    } = req;

    if (method == "DELETE" || method == "GET") {
        let {
            error
        } = schema.validate(query);
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
        let {
            error
        } = schema.validate(body);
        if (error) {
            return res.status(422).json({
                error: {
                    type: "body validation",
                    key: error.details[0].context.key,
                    message: error.details[0].message,
                },
                status: 422,
            });
        }
        next();
    }
};

module.exports = validator