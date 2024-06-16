const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const pool = require("../config/db");
const router = express.Router();

// 회원가입 라우트
router.post("/signUp", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const client = await pool.connect();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await client.query(
      "INSERT INTO users (username, hashed_password, salt, email, email_verified) VALUES ($1, $2, $3, $4, $5)",
      [username, hashedPassword, salt, email, false]
    );

    client.release();

    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.redirect("/signUp");
  }
});

// 로그인 라우트
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// 로그아웃 라우트
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
