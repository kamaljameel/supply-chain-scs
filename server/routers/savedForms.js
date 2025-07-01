const express = require("express");
const router = express.Router();
const savedFormController = require("../controllers/savedFormController");

router.post("/save", savedFormController.saveForm);
router.get("/list/:userId", savedFormController.getSavedForms);
router.delete("/remove/:inquiryId", savedFormController.removeForm);

module.exports = router;
