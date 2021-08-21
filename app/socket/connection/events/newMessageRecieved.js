const { devLogger } = require("../../../../core/debug");
const { sendMessageService } = require("../../../api/Chat/services");

const newMessageRecieved = (socket, IO) => {
  socket.on("newMessage", async (data) => {
    try {
      devLogger("New message recieved", data);

      const { receiverId, message } = data;

      let { userData: user } = socket;

      if (!receiverId) return;

      let { data: messageData, error } = await sendMessageService({
        user,
        body: { message, userId: receiverId },
      });

      if (error) return;

      IO.sockets.in(`${receiverId}`).emit("newMessage", messageData);
      IO.sockets.in(`${user.id}`).emit("newMessageDone", messageData);
    } catch (error) {
      console.error(error);
    }
  });
};

module.exports = newMessageRecieved;
