const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.signUp);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/user", userController.getUser);
router.put("/user", userController.updateUser);

module.exports = router;
