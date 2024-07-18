// routes/login.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

router.post("/", async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const user = await User.findOne({ where: { Email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.verified) {
      return res.status(403).json({ message: "Email not verified" });
    }

    const isPasswordValid = await bcrypt.compare(Password, user.Password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: user.Email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1y",
    });

    res.status(200).json({
      user: {
        id: user.id,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Email: user.Email,
        role: user.role,
      },
      accessToken: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/users", async (req, res) => {
  try {
    // Find all users
    const users = await User.findAll({
      attributes: ["id", "FirstName", "LastName", "Email", "role"], // Specify the fields you want to fetch
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
// Get current user route
router.get("/users/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", ""); // Extract token from authorization header

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify and decode JWT token
    const userEmail = decoded.email; // Extract user email from decoded token

    const user = await User.findOne({ where: { Email: userEmail } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return user details
    res.json({ user });
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    res.status(500).json({ error: "Failed to fetch user details" });
  }
});
router.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find user by id
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if userId matches the logged-in user's id
    if (user.id !== req.userId) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    // Return user details including accessToken
    res.json({ user, accessToken: req.accessToken });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

module.exports = router;
