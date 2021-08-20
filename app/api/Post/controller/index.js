const { controller } = require("../../../middlewares");
const { createPostService, listPostService } = require("../services");

module.exports = {
  createPostController: controller(createPostService),
  listPostController: controller(listPostService),
};
