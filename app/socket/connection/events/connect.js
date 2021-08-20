const { devLogger } = require("../../../../core/debug");

const joinConnection = (socket) => {
  const { userData } = socket;
  devLogger("User Connected", userData);
  let user = userData;
  if (user) {
  } else {
    return socket.disconnect();
  }
};

module.exports = { joinConnection };
