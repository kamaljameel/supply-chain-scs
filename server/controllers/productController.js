const axios = require("axios");
require("dotenv").config();
// API Configuration
const API_BASE_URL = "https://api.abisolcrm.com.au/v1/Product";
// const API_HEADERS = {
//   "x-api-key": "7d771e41bb5c449582122749df6bc0a3",
//   "audience-key": "cd055e6fe492453c93f1f25c04a6cc60",
//   Authorization:
//     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjdkNzcxZTQxYmI1YzQ0OTU4MjEyMjc0OWRmNmJjMGEzIn0.eyJhcGlfQXBwVXNlcklEIjoiOTFmZjdiYTItODBiNC00MDU3LWJkZDQtZWZkMDc3MjY2MDA4Iiwic2Vzc2lvbnVzZXJpZCI6IjQiLCJUZW5hbnREb21haW4iOiJ0ZG9tYWluMDIiLCJleHAiOjE3MzEwMjIyNTIsImlzcyI6Imh0dHBzOi8vd3d3LmFiaXNvbGNybS5jb20uYXUiLCJhdWQiOiJjZDA1NWU2ZmU0OTI0NTNjOTNmMWYyNWMwNGE2Y2M2MCJ9.IbE0YEp8jFavI5sk_nmd4OrHj9zN3O9DssXEhWcwzfA",
// };
// Create a new product
exports.createProduct = async (req, res) => {
  // Log the entire headers to check if Authorization header is present
  // console.log("Request Headers:", req.headers);

  // Extract the token from Authorization header
  const abisolToken = req.headers["authorization"]?.split(" ")[1]; // Extract token

  // If token doesn't exist, respond with error
  if (!abisolToken) {
    return res.status(401).json({ error: "Authorization token is missing" });
  }

  const API_HEADERS = {
    "x-api-key": process.env.X_API_KEY,
    "audience-key": process.env.AUDIENCE_KEY,
    Authorization: `bearer ${abisolToken}`, // Attach the token in the headers
  };

  console.log("API Headers:", API_HEADERS);
  try {
    const {
      productCategoryId,
      productName,
      productDescription,
      hsCode,
      customDescription,
      unitOfMeasurement,
      size,
      length,
      width,
      height,
      price,
      netweight,
      grossweight,
    } = req.body;

    const response = await axios.post(
      API_BASE_URL,
      {
        Name: productName,
        Description: productDescription,
        Price: price,
        ProductCategoryID: productCategoryId,
        Code_SKU: hsCode,
        Dimensions: `${length}x${width}x${height}`,
        Weight: netweight,
      },
      { headers: API_HEADERS }
    );

    res.status(201).json(response.data);
  } catch (error) {
    console.error("Error creating product:", error.message);
    res
      .status(500)
      .json({ error: "Error creating product", details: error.message });
  }
};

// Get all products
// exports.getProducts = async (req, res) => {
//   try {
//     // Fetch all products from the database
//     const products = await Product.findAll();

//     // Send the products as a response
//     res.status(200).json(products);
//   } catch (error) {
//     // Handle errors and send a 500 status with the error message
//     res
//       .status(500)
//       .json({ error: "Error fetching products", details: error.message });
//   }
// };

exports.getProducts = async (req, res) => {
  // Log the entire headers to check if Authorization header is present
  console.log("Request Headersgg:", req.headers);

  // Extract the token from Authorization header
  const abisolToken = req.headers["authorization"]?.split(" ")[1]; // Extract token

  // If token doesn't exist, respond with error
  if (!abisolToken) {
    return res.status(401).json({ error: "Authorization token is missing" });
  }

  const API_HEADERS = {
    "x-api-key": process.env.X_API_KEY,
    "audience-key": process.env.AUDIENCE_KEY,
    Authorization: `bearer ${abisolToken}`, // Attach the token in the headers
  };

  console.log("API Headers:", API_HEADERS);
  try {
    const { data: products } = await axios.get(API_BASE_URL, {
      headers: API_HEADERS,
    });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res
      .status(500)
      .json({ error: "Error fetching products", details: error.message });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data: product } = await axios.get(`${API_BASE_URL}/${id}`, {
      headers: API_HEADERS,
    });
    res.status(200).json(product);
  } catch (error) {
    console.error(
      `Error fetching product with ID ${req.params.id}:`,
      error.message
    );
    res
      .status(500)
      .json({ error: "Error fetching product", details: error.message });
  }
};

// Update a product by ID

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      productCategoryId,
      productName,
      productDescription,
      hsCode,
      customDescription,
      unitOfMeasurement,
      size,
      length,
      width,
      height,
      price,
      netweight,
      grossweight,
    } = req.body;

    const response = await axios.put(
      `${API_BASE_URL}/${id}`,
      {
        Name: productName,
        Description: productDescription,
        Price: price,
        ProductCategoryID: productCategoryId,
        Code_SKU: hsCode,
        Dimensions: `${length}x${width}x${height}`,
        Weight: netweight,
      },
      { headers: API_HEADERS }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      `Error updating product with ID ${req.params.id}:`,
      error.message
    );
    res
      .status(500)
      .json({ error: "Error updating product", details: error.message });
  }
};

// Delete a product by ID

exports.deleteProductFromExternalApi = async (req, res) => {
  try {
    // Extract product ID from the request parameters
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    // External API URL
    const externalApiUrl = `https://api.abisolcrm.com.au/v1/Product/${productId}`;
    console.log("Sending DELETE request to:", externalApiUrl);

    // Set up headers for the external API request
    const headers = {
      "x-api-key": "7d771e41bb5c449582122749df6bc0a3",
      "audience-key": "cd055e6fe492453c93f1f25c04a6cc60",
      Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjdkNzcxZTQxYmI1YzQ0OTU4MjEyMjc0OWRmNmJjMGEzIn0.eyJhcGlfQXBwVXNlcklEIjoiOTFmZjdiYTItODBiNC00MDU3LWJkZDQtZWZkMDc3MjY2MDA4Iiwic2Vzc2lvbnVzZXJpZCI6IjQiLCJUZW5hbnREb21haW4iOiJ0ZG9tYWluMDIiLCJleHAiOjE3MzEwMjIyNTIsImlzcyI6Imh0dHBzOi8vd3d3LmFiaXNvbGNybS5jb20uYXUiLCJhdWQiOiJjZDA1NWU2ZmU0OTI0NTNjOTNmMWYyNWMwNGE2Y2M2MCJ9.IbE0YEp8jFavI5sk_nmd4OrHj9zN3O9DssXEhWcwzfA`, // Make sure the token is correct and not expired
    };

    // Call the external API to delete the product
    try {
      const response = await axios.delete(externalApiUrl, { headers });
      console.log("External API response:", response.data);
      res
        .status(200)
        .json({ message: "Product deleted successfully from external API" });
    } catch (apiError) {
      console.error(
        "External API error:",
        apiError.response?.data || apiError.message
      );
      return res.status(500).json({
        error: "Failed to delete product from external API",
        details: apiError.response?.data || apiError.message,
      });
    }
  } catch (error) {
    console.error("Error deleting product from external API:", error.message);
    res.status(500).json({
      error: "Error deleting product from external API",
      details: error.message,
    });
  }
};
