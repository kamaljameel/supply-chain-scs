const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const Product = require("../models/Product");

// GET method to retrieve all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST method to add a product
router.post("/productsadd", async (req, res) => {
  const { name, price, email, password, role } = req.body;

  // Check if all required fields are provided
  if (!name || !price || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if email is already in use
    const existingProduct = await Product.findOne({ where: { email } });
    if (existingProduct) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the product
    const product = await Product.create({
      name,
      price,
      email,
      password: hashedPassword,
      role,
    });

    // Respond with the created product
    res.json({ product });
  } catch (error) {
    console.error("Product creation error:", error);

    // Check if Sequelize validation error
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((e) => ({
        field: e.path,
        message: e.message,
      }));
      res.status(400).json({ errors });
    } else {
      // For other errors, respond with a generic message
      res.status(500).json({ error: "Product creation failed" });
    }
  }
});

module.exports = router;
