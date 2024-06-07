const express = require('express');
const contactController = require('../controllers/ContactController');
const router = express.Router();
router.post('/', contactController.contactForm);
module.exports = router;
