const express = require("express");
const bcrypt = require("bcryptjs");
const env = require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1y", // Token expiration time
      }
    );

    // Respond with the created user and token
    res.status(201).json({ user, accessToken: token });
  } catch (error) {
    console.error("Signup error:", error);

    // Check if Sequelize validation error
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((e) => ({
        field: e.path,
        message: e.message,
      }));
      res.status(400).json({ errors });
    } else {
      // For other errors, respond with generic message
      res.status(500).json({ error: "User creation failed" });
    }
  }
});

module.exports = router;
