const userFinder = require("../../../shared/userFinder");
const { Question } = require("../../../../models");
const { Op } = require("sequelize");
const getFileFromAWS = require("../../../shared/AWS/getFile");
const viewProfileService = async ({ query }) => {
  const { userId, username } = query;
  let user;

  if (userId) user = await userFinder.findById(userId);
  if (!userId && username) user = await userFinder.findByUsername(username);

  if (!user)
    return {
      error: "User not found",
      status: 404,
    };

  let answersCount = await Question.count({
    where: { userId: user.id, answer: { [Op.ne]: null } },
  });

  user.answersCount = answersCount;
  if (user.image) {
    user.image = await getFileFromAWS(user.image);
    console.log(user.image);
  }
  delete user.hashedPassword;
  return {
    data: user,
    message: "success",
  };
};
module.exports = viewProfileService;
