const router = require("express").Router();
const { inputValidator, isAuthenticated } = require("../../../middlewares");
const { createPostSchema, listPostSchema } = require("../schema");
const { createPostController, listPostController } = require("../controller");

const routes = {
  base: "/post",
  root: "/",
};

router.post(
  routes.root,
  isAuthenticated(),
  inputValidator(createPostSchema),
  createPostController
);

router.get(routes.root, inputValidator(listPostSchema), listPostController);

module.exports = {
  postBaseRoute: routes.base,
  postBaseRouter: router,
};
