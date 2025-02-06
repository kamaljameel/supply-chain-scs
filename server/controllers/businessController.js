const axios = require("axios");
require("dotenv").config();

// API Configuration
const API_BASE_URL = "https://api.abisolcrm.com.au/v1/Business";

// Function to get API headers
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

// Create a new business
exports.createBusiness = async (req, res) => {
  try {
    const headers = getApiHeaders(req);
    const businessData = req.body;

    const response = await axios.post(API_BASE_URL, businessData, { headers });
    res.status(201).json(response.data);
  } catch (error) {
    handleAxiosError(res, error, "Error creating business");
  }
};

// Get all businesses
exports.getBusinesses = async (req, res) => {
  try {
    const headers = getApiHeaders(req);

    const response = await axios.get(API_BASE_URL, { headers });
    res.status(200).json(response.data);
  } catch (error) {
    handleAxiosError(res, error, "Error fetching businesses");
  }
};

// Get a single business by ID
exports.getBusinessById = async (req, res) => {
  try {
    const headers = getApiHeaders(req);
    const { id } = req.params;

    const response = await axios.get(`${API_BASE_URL}/${id}`, { headers });
    res.status(200).json(response.data);
  } catch (error) {
    handleAxiosError(res, error, "Error fetching business");
  }
};

// Update a business by ID
exports.updateBusiness = async (req, res) => {
  try {
    const headers = getApiHeaders(req);
    const { id } = req.params;
    const updatedData = req.body;

    const response = await axios.put(`${API_BASE_URL}/${id}`, updatedData, {
      headers,
    });
    res.status(200).json(response.data);
  } catch (error) {
    handleAxiosError(res, error, "Error updating business");
  }
};

// Delete a business by ID
exports.deleteBusiness = async (req, res) => {
  try {
    const headers = getApiHeaders(req);
    const { id } = req.params;

    await axios.delete(`${API_BASE_URL}/${id}`, { headers });
    res.status(200).json({ message: "Business deleted successfully" });
  } catch (error) {
    handleAxiosError(res, error, "Error deleting business");
  }
};

// Error handling function
const handleAxiosError = (res, error, defaultMessage) => {
  console.error(defaultMessage, error.message);

  if (error.response) {
    res.status(error.response.status).json({
      error: defaultMessage,
      details: error.response.data,
    });
  } else if (error.request) {
    res.status(500).json({
      error: "No response received from the server",
      details: error.message,
    });
  } else {
    res.status(500).json({
      error: "Error setting up the request",
      details: error.message,
    });
  }
};
