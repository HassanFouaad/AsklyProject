const tokenGenerator = require("../../../shared/tokenGenerator");
const userFinder = require("../../../shared/userFinder");
const bcrypt = require("bcrypt");

const signInService = async ({ body: { email, password } }) => {
  let authError = {
    error: "Invalid email or password",
    status: 401,
  };

  let user = await userFinder.findByEmail(email);

  if (!user) return authError;
  let compare = await bcrypt.compare(password, user.hashedPassword);
  if (!compare) return authError;

  delete user.hashedPassword;

  return {
    message: "Welcome back!",
    data: {
      user,
      token: tokenGenerator(user),
    },
  };
};

module.exports = signInService;
