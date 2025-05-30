// 7. routes/fileRoutes.js
const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");
const upload = require("../middleware/multer");

// Upload single file
router.post("/upload", upload.single("file"), fileController.uploadFile);

// Upload multiple files
router.post(
  "/upload-multiple",
  upload.array("files", 5),
  fileController.uploadMultipleFiles
);

// Get all files
router.get("/files", fileController.getAllFiles);

// Download file
router.get("/download/:id", fileController.downloadFile);

// Delete file
router.delete("/delete/:id", fileController.deleteFile);

module.exports = router;
