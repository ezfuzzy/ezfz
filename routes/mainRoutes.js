const express = require("express");
const path = require("path");
const router = express.Router();

/**
 * -------------------------------------
 *
 * Main Routes
 *
 * -------------------------------------
 */

// Index page
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index", "index.html"));
});

// Omok page
router.get("/omok", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "omok", "omok.html"));
});

// TicTacToe page
router.get("/tictactoe", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "tictactoe", "tictactoe.html"));
});

// catchMind page
router.get("/catchMind", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "catchMind", "catchMind.html"));
});

// graph-visualizer page
router.get("/graph-visualizer", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "graph-visualizer", "graph-visualizer.html"));
});

// maybe text share page (using localStorage)
router.get("/shareText", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "shareText", "shareText.html"));
});

// sign-up page
router.get("/sign-up", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "sign-up", "sign-up.html"));
});

// sign-in page
router.get("/sign-in", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "sign-in", "sign-in.html"));
});

// 인증된 사용자만 접근 가능하도록 미들웨어 설정
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// user-dashboard page: 인증된 사용자만 접근 가능
router.get("/user-dashboard", ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "user-dashboard", "user-dashboard.html"));
});

module.exports = router;
