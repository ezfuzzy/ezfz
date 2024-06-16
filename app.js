const express = require("express");
const http = require("http");
const path = require("path");

const session = require("express-session");
const passport = require("passport");
const sequelize = require("./config/db");
const initializePassport = require("./config/passport");

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
app.use(express.urlencoded({ extended: false }));
// JSON parsing middleware
app.use(express.json());

// 세션 설정
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

initializePassport(passport);
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
