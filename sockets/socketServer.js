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

  // io.on("connection", (socket) => { // > 웹사이트 어디서나 하나의 socket으로 동작해야함.
  //   console.log(
  //     `User connected: ${new Date().toLocaleTimeString("en-GB", {
  //       hour12: false,
  //     })}`
  //   );

  //   socket.on("chat message", (msg) => {
  //     io.emit("chat message", msg);
  //   });

  //   socket.on("notification", (msg) => {
  //     io.emit("notification", msg);
  //   });

  //   socket.on("disconnect", () => {
  //     console.log(
  //       `User disconnected: ${new Date().toLocaleTimeString("en-GB", {
  //         hour12: false,
  //       })}`
  //     );
  //   });
  // });

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
