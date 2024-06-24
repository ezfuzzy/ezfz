const socketIo = require("socket.io");
const tictactoeHandler = require("./handlers/tictactoeHandler");
const omokHandler = require("./handlers/omokHandler");
const catchMindHandler = require("./handlers/catchMindHandler");

function socketServer(server) {
  const io = socketIo(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Main user connected: ${socket.id}`);

    socket.on("error", (error) => {
      console.error(`Socket ${socket.id} error:`, error);
    });

    socket.on("disconnect", () => {
      console.log(`Main user disconnected: ${socket.id}`);
    });
  });

  tictactoeHandler(io.of("/tictactoe"));
  omokHandler(io.of("/omok"));
  catchMindHandler(io.of("/catchMind"));

  return io;
}

module.exports = socketServer;
