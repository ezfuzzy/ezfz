module.exports = function(namespace) {
  namespace.on("connection", (socket) => {
    console.log(`Catchmind user connected: ${socket.id}`);


    socket.on("disconnect", () => {
      console.log(`Catchmind user disconnected: ${socket.id}`);
    });

    socket.on("error", (error) => {
      console.error(`Catchmind socket ${socket.id} error:`, error);
    });
  });
};