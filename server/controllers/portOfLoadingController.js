const axios = require("axios");

const API_URL = "https://api.abisolcrm.com.au/v1/List_PortOfLoading";
// const HEADERS = {
//   "x-api-key": "7d771e41bb5c449582122749df6bc0a3",
//   "audience-key": "cd055e6fe492453c93f1f25c04a6cc60",
//   Authorization:
//     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjdkNzcxZTQxYmI1YzQ0OTU4MjEyMjc0OWRmNmJjMGEzIn0.eyJhcGlfQXBwVXNlcklEIjoiOTFmZjdiYTItODBiNC00MDU3LWJkZDQtZWZkMDc3MjY2MDA4Iiwic2Vzc2lvbnVzZXJpZCI6IjQiLCJUZW5hbnREb21haW4iOiJ0ZG9tYWluMDIiLCJleHAiOjE3MzEwMjIyNTIsImlzcyI6Imh0dHBzOi8vd3d3LmFiaXNvbGNybS5jb20uYXUiLCJhdWQiOiJjZDA1NWU2ZmU0OTI0NTNjOTNmMWYyNWMwNGE2Y2M2MCJ9.IbE0YEp8jFavI5sk_nmd4OrHj9zN3O9DssXEhWcwzfA",
//   "Content-Type": "application/json",
// };
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
exports.getPorts = async (req, res) => {
  try {
    const headers = getApiHeaders(req);
    const response = await axios.get(API_URL, { headers });
    res.json(response.data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch ports", message: err.message });
  }
};

// ADD new port
exports.addPort = async (req, res) => {
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
    res.status(500).json({ error: "Failed to add port", message: err.message });
  }
};

// EDIT port by ID
exports.editPort = async (req, res) => {
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
      .json({ error: "Failed to edit port", message: err.message });
  }
};
// GET port by ID
exports.getPortById = async (req, res) => {
  try {
    const headers = getApiHeaders(req);
    const allPorts = await axios.get(API_URL, { headers });

    const port = allPorts.data.find(
      (item) => parseInt(item.ID) === parseInt(req.params.id)
    );

    if (!port) {
      return res.status(404).json({ error: "Port not found" });
    }

    res.json(port);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch port", message: err.message });
  }
};
