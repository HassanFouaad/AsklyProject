const {
    viewProfileService,
    updateProfileService
} = require("../services");

const {
    controller
} = require("../../../middlewares");


module.exports = {
    viewProfileController: controller(viewProfileService),
    updateProfileController:controller(updateProfileService)
}