const express = require("express");
const { resetPassword } = require("../controllers/userController");
const router = express.Router();

router.post("/", async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    await resetPassword(token, newPassword);
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
