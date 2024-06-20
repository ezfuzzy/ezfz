const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const user = require("../models/user");

router.post("/signUp", userController.signUp);
router.post("/signIn", userController.login);
router.get("/logout", userController.logout);
router.get("/user", userController.getUser);
router.put("/user", userController.updateUser);
router.get("/checkEmail", user.getUserByEmail);
router.get("/checkUsername", user.getUserByUsername);

module.exports = router;
