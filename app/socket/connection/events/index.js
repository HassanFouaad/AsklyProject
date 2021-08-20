const { joinConnection } = require("./connect");

const socketController = (socket) => {
  joinConnection(socket);
};

module.exports = socketController;
