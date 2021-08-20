const { Post, PostQuestion } = require("../../../../models");

let addQuestionPost = async (questionId, postId) => {
  return await PostQuestion.create({ questionId, postId });
};

module.exports = async ({ user, body }) => {
  const { questionId, text } = body;
  let post = await Post.create({
    text,
    userId: user.id,
  });

  if (questionId) addQuestionPost(questionId, post.id);

  return {
    data: post,
    message: "Post has been added",
  };
};
