const express = require("express");
const { forgotPassword } = require("../controllers/userController");
const router = express.Router();

router.post("/", async (req, res) => {
  const { email } = req.body;

  try {
    await forgotPassword(email);
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
