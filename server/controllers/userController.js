const passport = require("passport");
const bcrypt = require("bcrypt");
const { createUser, getUserByEmail, getUserById, getUserByUsername } = require("../models/user");

// 사용자 등록
// TODO: email verification
const signUp = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const existingUserEmail = await getUserByEmail(email);
    const existingUsername = await getUserByUsername(username);

    if (existingUserEmail) {
      return res.status(400).json({ error: "Email already in use" });
    } else if (existingUsername) {
      return res.status(400).json({ error: "Username already in use" });
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
    if (err) {
      return res.status(500).json({ error: "An error occurred during authentication" });
    }
    if (!user) {
      return res.status(400).json({ error: info.message || "Invalid email or password" });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: "An error occurred during login" });
      }
      // 민감한 정보를 제외한 사용자 정보만 반환
      const userInfo = {
        id: user.id,
        email: user.email,
        username: user.username
      };
      return res.status(200).json({ message: "Logged in successfully", user: userInfo });
    });
  })(req, res, next);
};

// 사용자 로그아웃
const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Session destruction failed" });
      }
      res.status(200).json({ message: "Logged out successfully" });
    });
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
