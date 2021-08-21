const { joinConnection } = require("./connect");
const newMessageRecieved = require("./newMessageRecieved");
const socketController = (socket, IO) => {
  joinConnection(socket, IO);
  newMessageRecieved(socket, IO);
};

module.exports = socketController;
