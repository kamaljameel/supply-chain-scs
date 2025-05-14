const express = require("express");
const router = express.Router();
const portOfLoadingController = require("../controllers/paymentMethodController");

// Get all ports
router.get("/", portOfLoadingController.getPorts);

// Add a new port
router.post("/add", portOfLoadingController.addPort);

// Edit port by ID
router.put("/edit/:id", portOfLoadingController.editPort);
// Get single port by ID
router.get("/:id", portOfLoadingController.getPortById);

module.exports = router;
