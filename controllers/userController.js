const passport = require("passport");
const bcrypt = require("bcrypt");
const { createUser, getUserByEmail, getUserById } = require("../models/User");

// 사용자 등록
// TODO: email verification
const signUp = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const existingUser = await getUserByEmail(email);
    // TODO: username check.
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const newUser = await createUser(email, username, password);
    res.status(201).json({ message: "User signUp successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// 사용자 로그인
const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ error: "Invalid email or password" });
    req.login(user, (err) => {
      if (err) return next(err);
      res.status(200).json({ message: "Logged in successfully", user });
    });
  })(req, res, next);
};

// 사용자 로그아웃
const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to log out" });
    }
    res.status(200).json({ message: "Logged out successfully" });
  });
};

// 사용자 정보 조회
const getUser = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  res.status(200).json(req.user);
};

// 사용자 정보 업데이트
const updateUser = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { email, password } = req.body;
  try {
    const user = await getUserById(req.user.id);
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    await user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  signUp,
  login,
  logout,
  getUser,
  updateUser,
};
