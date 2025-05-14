const express = require("express");
const router = express.Router();
const shippingTermsController = require("../controllers/shippingTermsController");

// Get all ports
router.get("/", shippingTermsController.getShipping);

// Add a new Shipping
router.post("/add", shippingTermsController.addShipping);

// Edit Shipping by ID
router.put("/edit/:id", shippingTermsController.editShipping);
// Get single Shipping by ID
router.get("/:id", shippingTermsController.getShippingById);

module.exports = router;
