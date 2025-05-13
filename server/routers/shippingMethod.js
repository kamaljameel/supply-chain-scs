const express = require("express");
const router = express.Router();
const shippingMethodController = require("../controllers/shippingMethodController");

// Get all shippingMethod
router.get("/", shippingMethodController.getShippingMethod);

// Add a new port
router.post("/add", shippingMethodController.addShippingMethod);

// Edit ShippingMethod by ID
router.put("/edit/:id", shippingMethodController.editShippingMethod);
// Get single ShippingMethod by ID
router.get("/:id", shippingMethodController.getShippingMethodById);

module.exports = router;
