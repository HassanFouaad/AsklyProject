const { Post, User, PostLike } = require("../../../../../models");

const togglePostLikeService = async ({ user, body: { postId } }) => {
  const post = await Post.findOne({
    where: { id: postId },
    include: [
      {
        model: PostLike,
        as: "postLikes",
        where: { userId: user.id },
        required: false,
      },
    ],
  });

  if (!post) return { error: "Invalid post id", status: 404 };
  let liked = post.dataValues.postLikes[0];

  if (liked) {
    await liked.update({ deletedAt: new Date() });
    liked = false;
  } else {
    await PostLike.create({ userId: user.id, postId: post.id });
    liked = true;
  }

  post.dataValues.liked = liked;
  delete post.dataValues.postLikes;
  return {
    message: "Success",
    data: post,
  };
};

module.exports = togglePostLikeService;
