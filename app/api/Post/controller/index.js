const { controller } = require("../../../middlewares");
const {
  createPostService,
  listPostService,
  deletePostService,
} = require("../services");

module.exports = {
  createPostController: controller(createPostService),
  listPostController: controller(listPostService),
  deletePostController: controller(deletePostService),
};
