const Product = require("../models/Product");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      hsCode,
      customDescription,
      unitOfMeasurement,
      size,
      length,
      width,
      height,
    } = req.body;

    // Create and save the new product
    const product = await Product.create({
      productName,
      productDescription,
      hsCode,
      customDescription,
      unitOfMeasurement,
      size,
      length,
      width,
      height,
    });

    // Send a success response with the created product
    res.status(201).json(product);
  } catch (error) {
    // Handle errors and send a 500 status with the error message
    res
      .status(500)
      .json({ error: "Error creating product", details: error.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.findAll();

    // Send the products as a response
    res.status(200).json(products);
  } catch (error) {
    // Handle errors and send a 500 status with the error message
    res
      .status(500)
      .json({ error: "Error fetching products", details: error.message });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    // Fetch the product by its ID
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      // Send a 404 status if the product is not found
      return res.status(404).json({ error: "Product not found" });
    }

    // Send the product as a response
    res.status(200).json(product);
  } catch (error) {
    // Handle errors and send a 500 status with the error message
    res
      .status(500)
      .json({ error: "Error fetching product", details: error.message });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      hsCode,
      customDescription,
      unitOfMeasurement,
      size,
      length,
      width,
      height,
    } = req.body;

    // Find the product by ID
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      // Send a 404 status if the product is not found
      return res.status(404).json({ error: "Product not found" });
    }

    // Update the product with the new data
    await product.update({
      productName,
      productDescription,
      hsCode,
      customDescription,
      unitOfMeasurement,
      size,
      length,
      width,
      height,
    });

    // Send the updated product as a response
    res.status(200).json(product);
  } catch (error) {
    // Handle errors and send a 500 status with the error message
    res
      .status(500)
      .json({ error: "Error updating product", details: error.message });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    // Find the product by ID
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      // Send a 404 status if the product is not found
      return res.status(404).json({ error: "Product not found" });
    }

    // Delete the product
    await product.destroy();

    // Send a 204 status to indicate successful deletion
    res.status(204).json({ message: "Product deleted successfully" });
  } catch (error) {
    // Handle errors and send a 500 status with the error message
    res
      .status(500)
      .json({ error: "Error deleting product", details: error.message });
  }
};
