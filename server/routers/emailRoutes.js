const express = require("express");
const multer = require("multer");
const { sendEmailWithPDF } = require("../controllers/emailController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/send-email",
  upload.single("pdf"),
  (req, res, next) => {
    console.log("File received:", req.file);
    console.log("Email:", req.body.email);
    next();
  },
  sendEmailWithPDF
);

module.exports = router;
