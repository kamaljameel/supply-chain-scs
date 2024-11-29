// controllers/userController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const axios = require("axios");

exports.login = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    // Check if the user exists in the local database
    const user = await User.findOne({ where: { Email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user's email is verified
    if (!user.verified) {
      return res.status(403).json({ message: "Email not verified" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Request to Abisol API
    console.log("Requesting Abisol API...");
    const abisolResponse = await axios.post(
      "https://api.abisolcrm.com.au/v1/CorporateUserLogin",
      { Email, Password },
      { headers: { "x-api-key": "7d771e41bb5c449582122749df6bc0a3" } }
    );

    // Check if Abisol API response contains data token
    if (abisolResponse.data && abisolResponse.data.data) {
      const abisolToken = abisolResponse.data.data;

      // Create a local JWT token for the user
      const token = jwt.sign(
        { email: user.Email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1y" }
      );

      // Send response with user info, local JWT token, and Abisol token
      return res.status(200).json({
        user: {
          id: user.id,
          FirstName: user.FirstName,
          LastName: user.LastName,
          Email: user.Email,
          role: user.role,
        },
        accessToken: token,
        abisolToken, // Abisol token added to response
      });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid credentials from Abisol" });
    }
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "FirstName", "LastName", "Email", "role"],
    });
    if (!users || users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    res.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userEmail = decoded.email;

    const user = await User.findOne({ where: { Email: userEmail } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    res.status(500).json({ error: "Failed to fetch user details" });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.id !== req.userId) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    res.json({ user, accessToken: req.accessToken });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};
