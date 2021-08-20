const { User } = require("../../../../models");
const userFinder = require("../../../shared/userFinder");
const bcrypt = require("bcrypt");
const signUpService = async ({ body }) => {
  try {
    const { email, mobile, firstName, lastName, password, username } = body;

    let [mobileExists, emailExists, userNameExists] = await Promise.all([
      userFinder.findByMobile(mobile),
      userFinder.findByEmail(email),
      userFinder.findByUsername(username),
    ]);
    if (emailExists)
      return {
        error: "Email already exists",
        status: 400,
      };

    if (mobileExists)
      return {
        error: "Mobile already exists",
        status: 400,
      };

    if (userNameExists)
      return {
        error: "Mobile already exists",
        status: 400,
      };

    let hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      mobile,
      firstName,
      lastname: lastName,
      hashedPassword,
      username,
    });
    delete user.toJSON().hashedPassword;
    return {
      data: user,
      message: "Welcome!",
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Server Error",
    };
  }
};

module.exports = signUpService;
