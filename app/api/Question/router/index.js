const router = require("express").Router();
const { inputValidator, isAuthenticated } = require("../../../middlewares");
const {
  sendQuestionSchema,
  viewMyQuestionsSchema,
  viewMySentQuestionsSchema,
  answerQuestionSchema,
} = require("../schema");
const {
  sendQuestionController,
  viewMyQuestionsController,
  viewMySentQuestionsController,
  answerQuestionController,
} = require("../controller");

const routes = {
  base: "/question",
  root: "/",
  sent: "/sent",
  answer: "/answer",
};

router.post(
  routes.root,
  isAuthenticated(),
  inputValidator(sendQuestionSchema),
  sendQuestionController
);
router.get(
  routes.root,
  isAuthenticated(),
  inputValidator(viewMyQuestionsSchema),
  viewMyQuestionsController
);
router.get(
  routes.sent,
  isAuthenticated(),
  inputValidator(viewMySentQuestionsSchema),
  viewMySentQuestionsController
);
router.post(
  routes.answer,
  isAuthenticated(),
  inputValidator(answerQuestionSchema),
  answerQuestionController
);
module.exports = {
  questionBaseRoute: routes.base,
  questionBaseRouter: router,
};
