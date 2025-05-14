const express = require("express");
const router = express.Router();
const varianceTermsController = require("../controllers/varianceTermsController");

// Get all ports
router.get("/", varianceTermsController.getVariance);

// Add a new Variance
router.post("/add", varianceTermsController.addVariance);

// Edit Variance by ID
router.put("/edit/:id", varianceTermsController.editVariance);
// Get single Variance by ID
router.get("/:id", varianceTermsController.getVarianceById);

module.exports = router;
