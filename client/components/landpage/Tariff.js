import React, { useState } from "react";
import axios from "axios";

export default function Tariff() {
  const [q, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // State for the selected product

  const handleProductSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.trim() === "") {
      setProducts([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://www.trade-tariff.service.gov.uk/search.json`,
        { params: { q: e.target.value } }
      );
      setProducts(response.data.results);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product); // Set the selected product details
    setProducts([]); // Clear the suggestions after selection
    setQuery(""); // Clear the search field after selection
  };

  return (
    <div>
      <h1>Search Products and Commodities</h1>

      <div style={{ position: "relative" }}>
        <input
          type="text"
          value={q}
          onChange={handleProductSearch}
          placeholder="Search for products"
        />
        {products.length > 0 && (
          <ul
            style={{
              position: "absolute",
              zIndex: 1,
              border: "1px solid #ccc",
              backgroundColor: "#fff",
              width: "100%",
              maxHeight: "200px",
              overflowY: "auto",
              padding: "0",
              margin: "0",
              listStyleType: "none",
            }}
          >
            {products.map((product, index) => (
              <li
                key={index}
                onClick={() => handleProductClick(product)}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
              >
                {product.description} (HS Code:{" "}
                {product.goods_nomenclature_item_id})
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedProduct && (
        <div style={{ marginTop: "20px" }}>
          <h2>Selected Product Information:</h2>
          <p>Description: {selectedProduct.description}</p>
          <p>HS Code: {selectedProduct.goods_nomenclature_item_id}</p>
        </div>
      )}
    </div>
  );
}
