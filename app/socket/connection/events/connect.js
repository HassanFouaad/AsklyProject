const { devLogger } = require("../../../../core/debug");

const joinConnection = async (socket, socketServer) => {
  const { userData } = socket;
  devLogger("User Connected", userData);
  let user = userData;
  if (user) {
    await socketServer.of("/").adapter.remoteJoin(socket.id, `${user.id}`);
  } else {
    return socket.disconnect();
  }
};

module.exports = { joinConnection };
