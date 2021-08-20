const http = require("http");
const app = require("./app");
let redisAdapter = require("socket.io-redis");
const connection = require("./app/socket");
const { prodLogger } = require("./core/debug");
const io = require("socket.io");
const { port } = require("./config");
const connect = require("./database");

const server = http.createServer(app);

let socketServer = io(server, {
  pingTimeout: 6000000,
  pingInterval: 30000,
  cookie: false,
  cors: {
    methods: ["GET", "POST"],
  },
});
socketServer.adapter(redisAdapter({ host: "localhost", port: 6379 }));
connection(socketServer);

connect();
server.listen(port, () => {
  return prodLogger.info(`Nodejs Server is up and running on ${port}`);
});
