module.exports = function(namespace) {
  namespace.on("connection", (socket) => {
    console.log(`Omok user connected: ${socket.id}`);


    socket.on("disconnect", () => {
      console.log(`Omok user disconnected: ${socket.id}`);
    });

    socket.on("error", (error) => {
      console.error(`Omok socket ${socket.id} error:`, error);
    });
  });
};