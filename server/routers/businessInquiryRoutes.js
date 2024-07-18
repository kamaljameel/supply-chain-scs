const express = require("express");
const router = express.Router();
const businessInquiryController = require("../controllers/businessInquiryController");

// Create a new business inquiry
router.post("/", businessInquiryController.createBusinessInquiry);

// Get all business inquiries
router.get("/", businessInquiryController.getAllBusinessInquiries);

// Get a single business inquiry by ID
router.get("/:id", businessInquiryController.getBusinessInquiryById);

// Update a business inquiry by ID
router.put("/:id", businessInquiryController.updateBusinessInquiry);

// Delete a business inquiry by ID
router.delete("/:id", businessInquiryController.deleteBusinessInquiry);

module.exports = router;
