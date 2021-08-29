const router = require("express").Router();
const {
  inputValidator,
  isAuthenticated,
  isGuestOrAuthenticated,
} = require("../../../middlewares");
const {
  createPostSchema,
  listPostSchema,
  deletePostSchema,
  togglePostLikeSchema,
} = require("../schema");
const {
  createPostController,
  listPostController,
  deletePostController,
  togglePostLikeController,
} = require("../controller");

const routes = {
  base: "/post",
  root: "/",
  like: "/like",
};
router.put(
  routes.like,
  isAuthenticated(),
  inputValidator(togglePostLikeSchema),
  togglePostLikeController
);
router.post(
  routes.root,
  isAuthenticated(),
  inputValidator(createPostSchema),
  createPostController
);

router.get(
  routes.root,
  isGuestOrAuthenticated(),
  inputValidator(listPostSchema),
  listPostController
);
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
