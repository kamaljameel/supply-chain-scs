const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

router.post("/", async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ where: { email: decoded.email } });

    if (!user) {
      return res.status(400).json({ error: "Invalid token or user not found" });
    }

    user.verified = true;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({ error: "Email verification failed" });
  }
});

module.exports = router;
