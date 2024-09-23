import { useState, useEffect } from "react";
import axios from "axios";
import { addProductApi, updateProductApi } from "@/utils/apiRoutes";
import { Form } from "react-bootstrap";

export default function ProductForm({
  closeModel,
  onFormSubmit,
  productToEdit,
}) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  console.log(productToEdit);

  const [product, setProduct] = useState({
    productName: "",
    productDescription: "",
    hsCode: "",
    customDescription: "",
    unitOfMeasurement: "kg",
    size: "XS",
    length: "",
    width: "",
    height: "",
  });

  // Initialize form for editing
  useEffect(() => {
    if (productToEdit) {
      setProduct({
        productName: productToEdit.productName,
        productDescription: productToEdit.productDescription,
        hsCode: productToEdit.hsCode,
        customDescription: productToEdit.customDescription,
        unitOfMeasurement: productToEdit.unitOfMeasurement,
        size: productToEdit.size,
        length: productToEdit.length,
        width: productToEdit.width,
        height: productToEdit.height,
      });
    }
  }, [productToEdit]);

  // tarif api
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
    setQuery(""); // Clear the search field after selection
    setProducts([]);
    setProduct({
      productName: "",
      productDescription: product.description,
      hsCode: product.goods_nomenclature_item_id,
      customDescription: "",
      unitOfMeasurement: "kg",
      size: "XS",
      length: "",
      width: "",
      height: "",
    });
  };

  // tarif api end
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (productToEdit) {
        // Update product
        response = await axios.put(
          `${updateProductApi}/${productToEdit.id}`,
          product
        );
      } else {
        // Add new product
        response = await axios.post(addProductApi, product);
      }

      if (response.status === 201 || response.status === 200) {
        closeModel();
        onFormSubmit();
        setProduct({
          productName: "",
          productDescription: "",
          hsCode: "",
          customDescription: "",
          unitOfMeasurement: "kg",
          size: "XS",
          length: "",
          width: "",
          height: "",
        });
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <>
      <Form.Group className="mb-3" htmlFor="formProductSearch">
        <Form.Control
          id="searchField"
          type="text"
          placeholder="Search for products"
          value={query}
          onChange={handleProductSearch}
          className="tarifsearch"
        />
        {products.length > 0 && (
          <ul className="list-group mt-2">
            {products.map((product, index) => (
              <li
                key={index}
                className="list-group-item"
                onClick={() => handleProductClick(product)}
              >
                {product.description} ({product.goods_nomenclature_item_id})
              </li>
            ))}
          </ul>
        )}
      </Form.Group>
      <form
        onSubmit={handleSubmit}
        className="addProductForm formgroupk w-100 h-100"
      >
        <input
          name="productName"
          placeholder="Product Name"
          value={product.productName}
          onChange={handleChange}
          required
        />
        <input
          name="productDescription"
          placeholder="Product Description"
          value={product.productDescription}
          onChange={handleChange}
          required
        />
        <input
          name="hsCode"
          placeholder="HS Code"
          value={product.hsCode}
          onChange={handleChange}
          required
        />
        <input
          name="customDescription"
          placeholder="Custom Description"
          value={product.customDescription}
          onChange={handleChange}
          required
        />
        <select
          name="unitOfMeasurement"
          value={product.unitOfMeasurement}
          onChange={handleChange}
          required
        >
          <option value="kg">kg</option>
          <option value="numbers">numbers</option>
          <option value="litters">litters</option>
          <option value="pics">pics</option>
        </select>
        <select
          name="size"
          value={product.size}
          onChange={handleChange}
          required
        >
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
          <option value="XXXL">XXXL</option>
        </select>
        <input
          name="length"
          placeholder="Length"
          value={product.length}
          onChange={handleChange}
          required
        />
        <input
          name="width"
          placeholder="Width"
          value={product.width}
          onChange={handleChange}
          required
        />
        <input
          name="height"
          placeholder="Height"
          value={product.height}
          onChange={handleChange}
          required
        />
        <button type="submit" className="text-white fw-bold">
          {productToEdit ? "Update Product" : "Add Product"}
        </button>
      </form>
    </>
  );
}
