const router = require("express").Router();
const { authRoute, authRouter } = require("../api/Auth/router");
const {
  profileBaseRouter,
  profileBaseRoute,
} = require("../api/Profile/router");

const {
  questionBaseRouter,
  questionBaseRoute,
} = require("../api/Question/router");

const { postBaseRoute, postBaseRouter } = require("../api/Post/router");
const { chatBaseRoute, chatBaseRouter } = require("../api/Chat/router");

router.use(authRoute, authRouter);
router.use(profileBaseRoute, profileBaseRouter);
router.use(questionBaseRoute, questionBaseRouter);
router.use(postBaseRoute, postBaseRouter);
router.use(chatBaseRoute, chatBaseRouter);

module.exports = router;
