const express = require("express");
const router = express.Router();
const axios = require("axios");

// Replace with your real HMRC API key if needed
const HMRC_API_KEY = "YOUR_API_KEY_HERE";

router.post("/check-multiple-eori", async (req, res) => {
  const { eoris } = req.body;

  try {
    const response = await axios.post(
      "https://api.service.hmrc.gov.uk/customs/eori/lookup/check-multiple-eori",
      { eoris },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/vnd.hmrc.1.0+json",
          Authorization: `Bearer ${HMRC_API_KEY}`, // if needed
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error checking EORIs:", error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || "Failed to check EORIs",
    });
  }
});

module.exports = router;
