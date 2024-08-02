// routes/login.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/loginController");

router.post("/", userController.login);
router.get("/users", userController.getUsers);
router.get("/users/me", userController.getCurrentUser);
router.get("/users/:id", userController.getUserById);

module.exports = router;
