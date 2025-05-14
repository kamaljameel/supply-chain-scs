const axios = require("axios");

const API_URL = "https://api.abisolcrm.com.au/v1/List_ShippingTerms";

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
exports.getShipping = async (req, res) => {
  try {
    const headers = getApiHeaders(req);
    const response = await axios.get(API_URL, { headers });
    res.json(response.data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch Shipping", message: err.message });
  }
};

// ADD new Shipping
exports.addShipping = async (req, res) => {
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
      .json({ error: "Failed to add Shipping", message: err.message });
  }
};

// EDIT Shipping by ID
exports.editShipping = async (req, res) => {
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
      .json({ error: "Failed to edit Shipping", message: err.message });
  }
};
// GET Shipping by ID
exports.getShippingById = async (req, res) => {
  try {
    const headers = getApiHeaders(req);
    const allShipping = await axios.get(API_URL, { headers });

    const shipping = allShipping.data.find(
      (item) => parseInt(item.ID) === parseInt(req.params.id)
    );

    if (!shipping) {
      return res.status(404).json({ error: "shipping not found" });
    }

    res.json(shipping);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch shipping", message: err.message });
  }
};
