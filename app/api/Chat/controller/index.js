const { listMyChatsService, sendMessageService } = require("../services");

const { controller } = require("../../../middlewares");

module.exports = {
  listMyChatsController: controller(listMyChatsService),
  sendMessageController: controller(sendMessageService),
};
