const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();
// POST route to forward inquiry to external API
const getApiHeaders = (req) => {
  const abisolToken = req.headers["authorization"]?.split(" ")[1];

  if (!abisolToken) {
    throw new Error("Authorization token is missing");
  }

  return {
    "x-api-key": process.env.X_API_KEY,
    "audience-key": process.env.AUDIENCE_KEY,
    Authorization: `Bearer ${abisolToken}`,
  };
};
router.post("/submit", async (req, res) => {
  const apiUrl = "https://api.abisolcrm.com.au/v1/Inquiry";
  const apiHeaders = getApiHeaders(req);

  try {
    const response = await axios.post(apiUrl, req.body, {
      headers: apiHeaders,
    });
    res.status(200).json(response.data); // Send the external API's response back to the client
  } catch (error) {
    console.error(
      "Error calling Abisol CRM API:",
      error?.response?.data || error.message
    );
    res.status(500).json({
      error: "Failed to submit inquiry",
      details: error?.response?.data || error.message,
    });
  }
});

// POST route to forward inquiry to secondary API
router.post("/add-product-to-list", async (req, res) => {
  const secondaryApiUrl = "https://api.abisolcrm.com.au/v1/InquiryProductLine"; // Replace this URL if it is different
  const apiHeaders = getApiHeaders(req);

  try {
    const response = await axios.post(secondaryApiUrl, req.body, {
      headers: apiHeaders,
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Error calling Secondary Abisol CRM API:",
      error?.response?.data || error.message
    );
    res.status(500).json({
      error: "Failed to submit inquiry to secondary API",
      details: error?.response?.data || error.message,
    });
  }
});
// PUT route to edit an existing inquiry
router.put("/edit/:inquiryId", async (req, res) => {
  const { inquiryId } = req.params;
  const apiUrl = `https://api.abisolcrm.com.au/v1/Inquiry/${inquiryId}`;
  const apiHeaders = getApiHeaders(req);

  try {
    const response = await axios.put(apiUrl, req.body, {
      headers: apiHeaders,
    });
    res.status(200).json(response.data); // Send the updated response back to the client
  } catch (error) {
    console.error(
      "Error updating inquiry via Abisol CRM API:",
      error?.response?.data || error.message
    );
    res.status(500).json({
      error: "Failed to update inquiry",
      details: error?.response?.data || error.message,
    });
  }
});
module.exports = router;
