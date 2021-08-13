const router = require('express').Router()
const {
    inputValidator,
    isAuthenticated
} = require("../../../middlewares")
const {
    viewProfileSchema,
    updateProfileSchema
} = require("../schema")
const {
    viewProfileController,
    updateProfileController
} = require("../controller")
const routes = {
    "base": "/profile",
    "root": "/"
}

router.get(routes.root, inputValidator(viewProfileSchema), viewProfileController)
router.put(routes.root, isAuthenticated(), inputValidator(updateProfileSchema), updateProfileController)
module.exports = {
    profileBaseRoute: routes.base,
    profileBaseRouter: router
}