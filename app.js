const { log } = require("console");
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

// JSON 파싱 미들웨어
app.use(express.json());

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

// Route for graph-visualizer page
app.get("/catchMind", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "catchMind", "catchMind.html"));
});

// Route for graph-visualizer page
app.get("/graph-visualizer", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "graph-visualizer", "graph-visualizer.html")
  );
});

/**
 * socket - tictactoe
 */

// Handle socket connections
io.on("connection", (socket) => {
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
 * graph visualizer API
 */
app.post("/api/graph", (req, res) => {
  const { matrix } = req.body;
  if (!matrix) {
    return res.status(400).json({ error: "Matrix is required" });
  }
  console.log("post");
  // 간단히 matrix를 그대로 반환
  console.log(matrix);
  res.json({ matrix });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
