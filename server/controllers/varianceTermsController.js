const axios = require("axios");

const API_URL = "https://api.abisolcrm.com.au/v1/List_VarianceTerms";

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
exports.getVariance = async (req, res) => {
  try {
    const headers = getApiHeaders(req);
    const response = await axios.get(API_URL, { headers });
    res.json(response.data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch Variance", message: err.message });
  }
};

// ADD new Variance
exports.addVariance = async (req, res) => {
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
      .json({ error: "Failed to add Variance", message: err.message });
  }
};

// EDIT Variance by ID
exports.editVariance = async (req, res) => {
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
      .json({ error: "Failed to edit Variance", message: err.message });
  }
};
// GET Variance by ID
exports.getVarianceById = async (req, res) => {
  try {
    const headers = getApiHeaders(req);
    const allVariance = await axios.get(API_URL, { headers });

    const variance = allVariance.data.find(
      (item) => parseInt(item.ID) === parseInt(req.params.id)
    );

    if (!variance) {
      return res.status(404).json({ error: "Variance not found" });
    }

    res.json(variance);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch Variance", message: err.message });
  }
};
