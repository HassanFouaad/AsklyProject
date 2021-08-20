const router = require("express").Router();
const { inputValidator } = require("../../../middlewares");
const { signUpController, signInController } = require("../controller");
const { signUpSchema, signInSchema } = require("../schema");

const routes = {
  base: "/auth",
  signup: "/signup",
  signIn: "/signIn",
};

router.post(routes.signup, inputValidator(signUpSchema), signUpController);
router.post(routes.signIn, inputValidator(signInSchema), signInController);

module.exports = {
  authRouter: router,
  authRoute: routes.base,
};
