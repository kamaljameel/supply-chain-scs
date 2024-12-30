const express = require("express");
const router = express.Router();
const axios = require("axios");

// POST route to forward inquiry to external API
router.post("/submit", async (req, res) => {
  const apiUrl = "https://api.abisolcrm.com.au/v1/Inquiry";
  const apiHeaders = {
    "x-api-key": "7d771e41bb5c449582122749df6bc0a3",
    "audience-key": "cd055e6fe492453c93f1f25c04a6cc60",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjdkNzcxZTQxYmI1YzQ0OTU4MjEyMjc0OWRmNmJjMGEzIn0.eyJhcGlfQXBwVXNlcklEIjoiOTFmZjdiYTItODBiNC00MDU3LWJkZDQtZWZkMDc3MjY2MDA4Iiwic2Vzc2lvbnVzZXJpZCI6IjQiLCJUZW5hbnREb21haW4iOiJ0ZG9tYWluMDIiLCJleHAiOjE3MzEwMjIyNTIsImlzcyI6Imh0dHBzOi8vd3d3LmFiaXNvbGNybS5jb20uYXUiLCJhdWQiOiJjZDA1NWU2ZmU0OTI0NTNjOTNmMWYyNWMwNGE2Y2M2MCJ9.IbE0YEp8jFavI5sk_nmd4OrHj9zN3O9DssXEhWcwzfA",
    "Content-Type": "application/json",
  };

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
  const apiHeaders = {
    "x-api-key": "7d771e41bb5c449582122749df6bc0a3",
    "audience-key": "cd055e6fe492453c93f1f25c04a6cc60",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjdkNzcxZTQxYmI1YzQ0OTU4MjEyMjc0OWRmNmJjMGEzIn0.eyJhcGlfQXBwVXNlcklEIjoiOTFmZjdiYTItODBiNC00MDU3LWJkZDQtZWZkMDc3MjY2MDA4Iiwic2Vzc2lvbnVzZXJpZCI6IjQiLCJUZW5hbnREb21haW4iOiJ0ZG9tYWluMDIiLCJleHAiOjE3MzEwMjIyNTIsImlzcyI6Imh0dHBzOi8vd3d3LmFiaXNvbGNybS5jb20uYXUiLCJhdWQiOiJjZDA1NWU2ZmU0OTI0NTNjOTNmMWYyNWMwNGE2Y2M2MCJ9.IbE0YEp8jFavI5sk_nmd4OrHj9zN3O9DssXEhWcwzfA",
    "Content-Type": "application/json",
  };

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

module.exports = router;
