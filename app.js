const express = require("express");
const http = require("http");
const path = require("path");

const app = express();
const server = http.createServer(app);

const mainRoutes = require("./routes/mainRoutes");
const authRoutes = require("./routes/authRoutes");
const apiRoutes = require("./routes/apiRoutes");

const socketServer = require("./sockets/socketServer");
const io = socketServer(server);

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
app.use("/", mainRoutes);
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 8080;
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
