const jwt = require("jsonwebtoken");
const { devLogger: logger } = require("../../../../core/debug");
const db = require("../../../../models");
module.exports = async (socket, next) => {
  const handshakeQuery = socket.handshake.query;
  if (!handshakeQuery || !handshakeQuery.token) {
    logger.error("Socket not connected");
    socket.leave(socket.id);
    socket.disconnect();
    return next(new Error("Authentication error"));
  }

  const token = handshakeQuery.token;

  jwt.verify(token, process.env.JWTSECRET, async (err, decoded) => {
    if (err) {
      socket.disconnect();
      return next(new Error("Authentication error"));
    }
    const { id } = decoded;
    const user = await db.User.findByPk(id);
    if (!user) {
      return socket.disconnect();
    }
    socket.userData = user.toJSON()
    return next();
  });
};
