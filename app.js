const express = require("express");
const session = require("express-session");
const http = require("http");
const path = require("path");

// const passport = require("passport");
const passport = require("./config/passport");
const bodyParser = require("body-parser");
const crypto = require("crypto");

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

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const secretKey = crypto.randomBytes(64).toString("hex");

// 세션 설정
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

/**
 * -------------------------------------
 *
 * Routes
 *
 * -------------------------------------
 */

app.use("/", mainRoutes);
app.use("/api", apiRoutes);
app.use("/api/auth", authRoutes);

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
