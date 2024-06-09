const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 8080;

// Static files middleware
app.use(express.static(path.join(__dirname, "public")));

// Route for Index page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index", "index.html"));
});

// Route for Omok page
app.get("/omok", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "omok", "omok.html"));
});

// Route for TicTacToe page
app.get("/tictactoe", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "tictactoe", "tictactoe.html"));
});

// Handle socket connections
io.on("connection", (socket) => {
  console.log(
    `User connected: ${new Date().toLocaleTimeString("en-GB", {
      hour12: false,
    })}`
  );

  socket.on("move", (data) => {
    if (!isMyTurn || gameEnded) return; // 클라이언트의 차례가 아니거나 게임이 끝났을 때 클릭 이벤트 무시

    socket.broadcast.emit("move", data);
    socket.broadcast.emit("turnChange", {
      nextPlayer: data.player === "X" ? "O" : "X",
    });
    if (checkWin(data.player)) {
      socket.emit("win", { winner: data.player });
      socket.broadcast.emit("win", { winner: data.player });
    }
  });

  socket.on("reset", () => {
    io.emit("reset");
  });

  socket.on("disconnect", () => {
    console.log(
      `User disconnected: ${new Date().toLocaleTimeString("en-GB", {
        hour12: false,
      })}`
    );
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
