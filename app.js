const { log } = require("console");
const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 8080;

/**
 * -------------------------------------
 *
 * Middleware
 *
 * -------------------------------------
 */

// Static files middleware
app.use(express.static(path.join(__dirname, "public")));

// JSON parsing middleware
app.use(express.json());

/**
 * -------------------------------------
 *
 * Routes
 *
 * -------------------------------------
 */

// Index page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index", "index.html"));
});

// Omok page
app.get("/omok", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "omok", "omok.html"));
});

// TicTacToe page
app.get("/tictactoe", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "tictactoe", "tictactoe.html"));
});

// catchMind page
app.get("/catchMind", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "catchMind", "catchMind.html"));
});

// graph-visualizer page
app.get("/graph-visualizer", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "graph-visualizer", "graph-visualizer.html")
  );
});

// maybe text share page (using localStorage)
app.get("/shareText", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "shareText", "shareText.html"));
});

// sign-up page
app.get("/sign-up", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "sign-up", "sign-up.html"));
});

// sign-in page
app.get("/sign-in", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "sign-in", "sign-in.html"));
});

// user-dashboard page
app.get("/user-dashboard", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "user-dashboard", "user-dashboard.html")
  );
});

/**
 * -------------------------------------
 *
 * Socket - Chat, Notification (Main Socket)
 *
 * -------------------------------------
 */

// io.on("connection", (socket) => {
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

// Handle socket connections
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
    `Omok User connected: ${new Date().toLocaleTimeString("en-GB", {
      hour12: false,
    })}`
  );
});

/**
 * -------------------------------------
 *
 * graph visualizer API
 *
 * -------------------------------------
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

/**
 * -------------------------------------
 *
 * Server on
 *
 * -------------------------------------
 */
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
