const { User } = require("../../../../models");
const userFinder = require("../../../shared/userFinder");

const updateProfileService = async ({ user, body, files }) => {
  if (body.username) {
    let taken = await userFinder.findByUsername(body.username);
    if (taken && taken.id != user.id)
      return { error: "Username is already taken", status: 400 };
  }

  let data = await User.update(body, {
    where: { id: user.id },
  });

  delete data.hashedPassword;
  return {
    data: body,
    message: "You have updated your profile",
  };
};

module.exports = updateProfileService;
