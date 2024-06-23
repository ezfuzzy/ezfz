const socketIo = require("socket.io");

function socketServer(server) {
  const io = socketIo(server);
  /**
   * -------------------------------------
   *
   * Socket - Chat, Notification (Main Socket)
   *
   * -------------------------------------
   */

  /**
   * -------------------------------------
   *
   * Socket - TicTacToe
   *
   * -------------------------------------
   */

  io.of("/tictactoe").on("connection", (socket) => {
    console.log(
      `Tictactoe User connected: ${new Date().toLocaleTimeString("en-GB", {
        hour12: false,
      })}`
    );

    socket.on("move", (data) => {
      socket.broadcast.emit("move", data);
      socket.broadcast.emit("turnChange", {
        nextPlayer: data.player === "X" ? "O" : "X",
      });
    });

    socket.on("win", (data) => {
      io.emit("win", data);
    });

    socket.on("draw", () => {
      io.emit("draw");
    });

    socket.on("gameEnd", () => {
      io.emit("gameEnd");
    });

    socket.on("reset", () => {
      io.emit("reset");
    });

    socket.on("disconnect", () => {
      console.log(
        `Tictactoe User disconnected: ${new Date().toLocaleTimeString("en-GB", {
          hour12: false,
        })}`
      );
    });
  });

  /**
   * -------------------------------------
   *
   * Socket - Omok
   *
   * -------------------------------------
   */
  io.of("/omok").on("connection", (socket) => {
    console.log(
      `Omok User connected: ${new Date().toLocaleTimeString("en-GB", {
        hour12: false,
      })}`
    );

    socket.on("disconnect", () => {
      console.log(
        `Omok User disconnected: ${new Date().toLocaleTimeString("en-GB", {
          hour12: false,
        })}`
      );
    });
  });

  /**
   * -------------------------------------
   *
   * Socket - CatchMind
   *
   * -------------------------------------
   */
  io.of("/catchMind").on("connection", (socket) => {
    console.log(
      `catchMind User connected: ${new Date().toLocaleTimeString("en-GB", {
        hour12: false,
      })}`
    );

    socket.on("disconnect", () => {
      console.log(
        `catchMind User disconnected: ${new Date().toLocaleTimeString("en-GB", {
          hour12: false,
        })}`
      );
    });
  });
  return io;
}

module.exports = socketServer;
