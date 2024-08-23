import { useState, useEffect } from "react";
import axios from "axios";
import { addProductApi } from "@/utils/apiRoutes";
export default function SelectProductForm() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(addProductApi);
        setProducts(response.data);
        console.log("ppppp", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleSelect = (e) => {
    const product = products.find(
      (prod) => prod.id === parseInt(e.target.value)
    );
    setSelectedProduct(product);
  };

  return (
    <div>
      <select onChange={handleSelect}>
        <option value="">Select a Product</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.productName}
          </option>
        ))}
      </select>
      {selectedProduct && (
        <div>
          <p>Product Name: {selectedProduct.productName}</p>
          <p>HS Code: {selectedProduct.hsCode}</p>
        </div>
      )}
    </div>
  );
}
