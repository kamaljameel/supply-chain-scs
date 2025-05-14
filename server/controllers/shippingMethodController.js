const axios = require("axios");

const API_URL = "https://api.abisolcrm.com.au/v1/List_ShippingMethod";

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
// GET all ports
exports.getShippingMethod = async (req, res) => {
  try {
    const headers = getApiHeaders(req);
    const response = await axios.get(API_URL, { headers });
    res.json(response.data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch ShippingMethod", message: err.message });
  }
};

// ADD new ShippingMethod
exports.addShippingMethod = async (req, res) => {
  try {
    const { Name, isDisabled, Serialno } = req.body;
    const headers = getApiHeaders(req);
    const response = await axios.post(
      API_URL,
      {
        Name,
        isDisabled,
        Serialno,
      },
      {
        headers,
      }
    );

    res.json(response.data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add ShippingMethod", message: err.message });
  }
};

// EDIT ShippingMethod by ID
exports.editShippingMethod = async (req, res) => {
  try {
    const headers = getApiHeaders(req);
    const ID = parseInt(req.params.id);
    const { Name, isDisabled } = req.body;

    const response = await axios.post(
      API_URL,
      {
        ID,
        Name,
        isDisabled,
      },
      {
        headers,
      }
    );

    res.json(response.data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to edit ShippingMethod", message: err.message });
  }
};
// GET ShippingMethod by ID
exports.getShippingMethodById = async (req, res) => {
  try {
    const headers = getApiHeaders(req);
    const allShippingMethod = await axios.get(API_URL, { headers });

    const shippingMethod = allShippingMethod.data.find(
      (item) => parseInt(item.ID) === parseInt(req.params.id)
    );

    if (!shippingMethod) {
      return res.status(404).json({ error: "shippingMethod not found" });
    }

    res.json(shippingMethod);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch shipping", message: err.message });
  }
};
