const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const pdfController = require("../controllers/pdfController");

const router = express.Router();

// Setup multer for file uploads
const upload = multer({ dest: "uploads/" });

// Upload new PDF
router.post("/upload", upload.single("pdf"), pdfController.uploadPDF);

// Get all PDFs for a user
router.get("/user/:userId", pdfController.getPDFsByUser);

// get all pdfs
router.get("/all", pdfController.getAllPDFs);

// Get a single PDF by ID
router.get("/:id", pdfController.getPDFById);

// Update a specific PDF
router.put("/:id", pdfController.updatePDF);

// ✅ New endpoint: Get all PDFs in the uploads folder// Get all PDFs from DB

// Get all PDFs from filesystem (optional)
router.get("/files", pdfController.getAllUploadedPDFs);

module.exports = router;
