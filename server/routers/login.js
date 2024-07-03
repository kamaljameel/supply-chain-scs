// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { json } = require("body-parser");
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1y", // Token expiration time
      }
    );

    // Respond with token
    res.json({ message: "Login successful", accessToken: token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});
router.get("/users", async (req, res) => {
  try {
    // Find all users
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role"], // Specify the fields you want to fetch
    });
    if (!users || users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    // Return users array
    res.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
