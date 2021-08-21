const router = require("express").Router();
const { inputValidator, isAuthenticated } = require("../../../middlewares");
const {
  createPostSchema,
  listPostSchema,
  deletePostSchema,
} = require("../schema");
const {
  createPostController,
  listPostController,
  deletePostController,
} = require("../controller");

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
router.delete(
  routes.root,
  isAuthenticated(),
  inputValidator(deletePostSchema),
  deletePostController
);

module.exports = {
  postBaseRoute: routes.base,
  postBaseRouter: router,
};
