const { verify } = require("jsonwebtoken");
const { JWTSecret } = require("../../../config");
const { prodLogger } = require("../../../core/debug");
const isAuthenticated = () => async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (!token) {
      return res
        .json({
          error: "Access Denied",
          status: 403,
        })
        .status(403);
    }
    let payload = await verify(token, JWTSecret);
    req.user = payload;
    return next();
  } catch (error) {
    prodLogger.error(error);
    return res.json({
      error: "Access Denied",
      status: 403,
    });
  }
};

module.exports = {
  isAuthenticated,
};
