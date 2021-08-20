const router = require("express").Router();
const { inputValidator, isAuthenticated } = require("../../../middlewares");
const { listMyChatsSchema, sendMessageSchema } = require("../schema");
const {
  listMyChatsController,
  sendMessageController,
} = require("../controller");

const routes = {
  base: "/chat",
  root: "/",
};
router.get(
  routes.root,
  isAuthenticated(),
  inputValidator(listMyChatsSchema),
  listMyChatsController
);

router.post(
  routes.root,
  isAuthenticated(),
  inputValidator(sendMessageSchema),
  sendMessageController
);
module.exports = {
  chatBaseRoute: routes.base,
  chatBaseRouter: router,
};
