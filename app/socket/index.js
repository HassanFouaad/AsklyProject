const { devLogger: logger } = require("../../core/debug");

const authentication = require("./connection/auth");
const socketController = require("./connection/events");

module.exports = (IO) => {
  IO.use(async (socket, next) => {
    return await authentication(socket, next);
  }).on("connection", (socket) => {
    socketController(socket);
    socket.on("disconnect", () => {
      socket.disconnect();
      logger("Socket User Leaved - User ID =" + socket.userData.id);
    });
  });
};
