module.exports = function(namespace) {
  namespace.on("connection", (socket) => {
    console.log(`Tictactoe user connected: ${socket.id}`);

    socket.on("move", (data) => {
      socket.broadcast.emit("move", data);
      socket.broadcast.emit("turnChange", {
        nextPlayer: data.player === "X" ? "O" : "X",
      });
    });

    socket.on("win", (data) => {
      namespace.emit("win", data);
    });

    socket.on("draw", () => {
      namespace.emit("draw");
    });

    socket.on("gameEnd", () => {
      namespace.emit("gameEnd");
    });

    socket.on("reset", () => {
      namespace.emit("reset");
    });

    socket.on("disconnect", () => {
      console.log(`Tictactoe user disconnected: ${socket.id}`);
    });

    socket.on("error", (error) => {
      console.error(`Tictactoe socket ${socket.id} error:`, error);
    });
  });
};