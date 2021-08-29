const createPostService = require("./createPostService");
const listPostService = require("./listPostService");
const deletePostService = require("./deletePostService");
const togglePostLikeService = require("./like/togglePostLike");

module.exports = {
  createPostService,
  listPostService,
  deletePostService,

  //Likes
  togglePostLikeService,
};
