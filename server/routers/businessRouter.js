const express = require("express");
const router = express.Router();
const {
  createBusiness,
  getBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
} = require("../controllers/businessController");

// Routes for Business CRUD operations
router.post("/create", createBusiness); // Create a business
router.get("/", getBusinesses); // Get all businesses
router.get("/:id", getBusinessById); // Get a single business by ID
router.put("/:id", updateBusiness); // Update a business by ID
router.delete("/:id", deleteBusiness); // Delete a business by ID

module.exports = router;
