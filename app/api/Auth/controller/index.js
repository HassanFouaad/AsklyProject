const {
    controller
} = require("../../../middlewares");
const {
    signUpService,
    signInService
} = require("../services");

module.exports = {
    signUpController: controller(signUpService),
    signInController: controller(signInService)
}