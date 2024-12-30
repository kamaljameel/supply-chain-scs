const express = require("express");
const router = express.Router();
const {
  updateUserProfile,
  getUserProfile,
} = require("../controllers/userController");

// Middleware for authentication
// const authenticate = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: "Unauthorized" });
//   }
// };

// Route to fetch user profile
router.get("/profile", async (req, res) => {
  try {
    const profile = await getUserProfile(req.user.id);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// // Route to update user profile
// router.put("/profile", authenticate, async (req, res) => {
//   try {
//     const updatedProfile = await updateUserProfile(req.user.id, req.body);
//     res.status(200).json(updatedProfile);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
router.put("/profile/:userId", updateUserProfile);

module.exports = router;
