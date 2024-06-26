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

// const socketServer = require("./sockets/socketServer");

// Middleware
app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.use(express.json());

// CORS 미들웨어 설정
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000", // React 앱의 주소
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());

const secretKey = crypto.randomBytes(64).toString("hex");

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
      //TODO: secure option
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    },
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
// socketServer(server);

// 서버 시작
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
