const { Post } = require("../../../../models");

module.exports = async ({ user, query }) => {
  let { postId } = query;
  let post = await Post.findOne({
    where: { id: postId, userId: user.id },
  });

  if (!post) return { error: "Post not found", status: 400 };
  await post.update({ deletedAt: new Date() });
  return {
    data: post,
    message: "Post has been added",
  };
};
