const express = require("express");
const session = require("express-session");
const http = require("http");
const path = require("path");
const cors = require("cors");
const passport = require("./config/passport");
const crypto = require("crypto");

require("dotenv").config();

const app = express();
const server = http.createServer(app);

const authRoutes = require("./routes/authRoutes");
const apiRoutes = require("./routes/apiRoutes");

const socketServer = require("./sockets/socketServer");

// Middleware
app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.use(express.json());
app.use(cors());
/* 
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

*/
const secretKey = crypto.randomBytes(64).toString("hex");

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api", apiRoutes);
app.use("/api/auth", authRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

const PORT = process.env.PORT || 8080;

// Socket.IO 서버 설정
socketServer(server);

// 서버 시작
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
