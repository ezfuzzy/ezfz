const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// 회원가입 라우트
router.post("/signUp", userController.signUp);

// 로그인 라우트
router.post("/login", userController.login);

// 로그아웃 라우트
router.get("/logout", userController.logout);

// 사용자 정보 조회
router.get("/user", userController.getUser);

// 사용자 정보 업데이트
router.put("/user", userController.updateUser);

module.exports = router;
