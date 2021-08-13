const router = require('express').Router()
const {
    authRoute,
    authRouter
} = require("../api/Auth/router");
const {
    profileBaseRouter,
    profileBaseRoute
} = require('../api/Profile/router');

const {
    questionBaseRouter,
    questionBaseRoute
} = require('../api/Question/router');

router.use(authRoute, authRouter)
router.use(profileBaseRoute, profileBaseRouter)
router.use(questionBaseRoute, questionBaseRouter)

module.exports = router