// controllers/userController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const axios = require("axios");

exports.login = async (req, res) => {
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
    console.log("testing other endpoint login...");

    const response = await axios.post;
    // "https://api.abisolcrm.com.au/v1/TenantUserLogin_WithPassword",
    "https://api.abisolcrm.com.au/v1/CorporateUserLogin",
      { Email, Password },
      { headers: { "x-api-key": "7d771e41bb5c449582122749df6bc0a3" } };

    if (response.data && response.data.data) {
      const token = jwt.sign(
        { email: user.Email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1y",
        }
      );

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
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
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
