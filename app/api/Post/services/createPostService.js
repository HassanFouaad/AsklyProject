const { Post, PostQuestion, User } = require("../../../../models");
const getFileFromAWS = require("../../../shared/AWS/getFile");
let addQuestionPost = async (questionId, postId) => {
  return await PostQuestion.create({ questionId, postId });
};

module.exports = async ({ user, body }) => {
  if (user.id) user = await User.findByPk(user.id);
  const { questionId, text } = body;
  let post = await Post.create({
    text,
    userId: user.id,
  });

  if (questionId) addQuestionPost(questionId, post.id);
  post.dataValues.user = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    image: await getFileFromAWS(user.image),
  };

  return {
    data: post,
    message: "Post has been added",
  };
};
