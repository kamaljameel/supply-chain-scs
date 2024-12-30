import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addProductApi,
  updateProductApi,
  deletExternalProductApi,
} from "@/utils/apiRoutes";
import { Button, Form } from "react-bootstrap";

export default function ProductForm({
  closeModel,
  onFormSubmit,
  productToEdit,
}) {
  const [query, setQuery] = useState("");
  const [edit, setEdit] = useState(false);
  const [products, setProducts] = useState([]);
  const [allproducts, setallProducts] = useState([]);

  console.log(products);
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
    price: "",
    productCategoryId: "",
    weight: "",
  });
  const abisolToken = localStorage.getItem("abisolToken");
  if (!abisolToken) {
    console.error("No token found.");
    return;
  }
  const fetchProducts = async () => {
    try {
      const response = await axios.get(addProductApi, {
        headers: {
          Authorization: `bearer ${abisolToken}`,
        },
      });
      setallProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Initialize form for editing
  useEffect(() => {
    if (productToEdit) {
      const [length, width, height] =
        productToEdit.Dimensions.split("x").map(Number);
      setProduct({
        productName: productToEdit.Name || "",
        productDescription: productToEdit.Description,
        hsCode: productToEdit.Code_SKU,
        customDescription: productToEdit.customDescription,
        unitOfMeasurement: productToEdit.unitOfMeasurement,
        size: productToEdit.size,
        length: length,
        width: width,
        height: height,
        price: productToEdit.Price,
        productCategoryId: productToEdit.ProductCategoryID,
        weight: productToEdit.weight,
      });
    }
    console.log("edipp333", productToEdit);
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
      // console.log("yyy", response.data.results);
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
      if (productToEdit && edit && productToEdit2) {
        // Update product
        console.log("kamp", productToEdit2);
        response = await axios.put(
          `${updateProductApi}/${
            productToEdit.ProductID || productToEdit2.productID
          }`,
          product,
          {
            headers: {
              Authorization: `bearer ${abisolToken}`,
            },
          }
        );
      } else {
        // Add new product
        response = await axios.post(addProductApi, product, {
          headers: {
            Authorization: `bearer ${abisolToken}`,
          },
        });
      }

      if (response.status === 201 || response.status === 200) {
        setEdit(false);
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
  let productToEdit2 = {};
  const handleEdit = (index) => {
    productToEdit2 = allproducts[index]; // Select the product to edit
    productToEdit = productToEdit2;
    console.log("edipp222", productToEdit2);
    setEdit(true);
    setProduct({
      productID: productToEdit2.ProductID || "",
      productName: productToEdit2.Name || "",
      productDescription: productToEdit2.Description || "",
      hsCode: productToEdit2.Code_SKU || "",
      customDescription: productToEdit2.customDescription || "",
      unitOfMeasurement: productToEdit2.unitOfMeasurement || "kg",
      size: productToEdit2.size || "XS",
      length: productToEdit2.Dimensions?.split("x")[0] || "",
      width: productToEdit2.Dimensions?.split("x")[1] || "",
      height: productToEdit2.Dimensions?.split("x")[2] || "",
      price: productToEdit2.Price || "",
      productCategoryId: productToEdit2.ProductCategoryID || "",
      weight: productToEdit2.weight || "",
    });
    // setallProducts((prev) => prev.filter((_, i) => i !== index));
    console.log("ghfgh", productToEdit2);
  };

  useEffect(() => {
    productToEdit2 = product;
    console.log("Updated product state:", productToEdit2);
  }, [product]);
  console.log("hh", productToEdit2);
  const handleDelete = async (productId) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (isConfirmed) {
      try {
        const response = await axios.delete(deletExternalProductApi(productId));
        if (response.status === 200) {
          // Show success toast
          toast.success("Product deleted successfully!");
          fetchProducts(); // Refresh the product list
        }
        console.log(response);
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete the product. Please try again.");
      }
    } else {
      console.log("Product deletion canceled");
    }
  };

  return (
    <>
      <div className="productformcom">
        <Form.Group className="mb-3" htmlFor="formProductSearch">
          <Form.Control
            id="searchField"
            type="text"
            placeholder="Search For Product Classification"
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
          <input
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            required
          />
          <input
            name="productCategoryId"
            placeholder="Product Category ID"
            value={product.productCategoryId}
            onChange={handleChange}
          />

          <input
            name="weight"
            placeholder="Weight"
            value={product.weight}
            onChange={handleChange}
          />
          <select
            name="use-for"
            // value={product.size}
            // onChange={handleChange}
            required
          >
            <option value="">Intended Use</option>
            <option value="Commercial Use">Commercial Use</option>
            <option value="Personal Use">Personal Use</option>
            <option value="Charitable Use">Charitable Use</option>
            <option value="Scientific or Educational Use">
              Scientific or Educational Use
            </option>
            <option value="Temporary Use">Temporary Use</option>
            <option value="End-Use Relief">End-Use Relief</option>
            <option value="Re-Export After Processing">
              Re-Export After Processing
            </option>
            <option value="Return Goods Relief (RGR)">
              Return Goods Relief (RGR)
            </option>
          </select>
          <button type="submit" className="text-white fw-bold">
            {productToEdit || edit ? "Update Product" : "Add Product"}
          </button>
        </form>
        {/* <ul>
          {allproducts.map((product, index) => (
            <li key={index}>{product.Name}</li>
          ))}
        </ul> */}

        <div className="product-table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>SKU</th>
                <th>Dimensions</th>
                <th>Weight</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allproducts?.map(
                (product, index) =>
                  (product.Name ||
                    product.Description ||
                    product.Price ||
                    product.Code_SKU) && (
                    <tr key={product.ProductID}>
                      <td>{product.Name || "-"}</td>
                      <td>{product.Description || "-"}</td>
                      <td>{product.Price ? `$${product.Price}` : "-"}</td>
                      <td>{product.Code_SKU || "-"}</td>
                      <td>{product.Dimensions || "-"}</td>
                      <td>{product.Weight ? `${product.Weight} kg` : "-"}</td>

                      <td className="d-flex gap-3">
                        <Button
                          variant="none"
                          size="sm"
                          onClick={() => handleEdit(index)}
                        >
                          <i className="bi bi-pencil-square text-success fs-5"></i>
                        </Button>{" "}
                        <Button
                          variant="none"
                          size="sm"
                          onClick={() => handleDelete(product.ProductID)}
                        >
                          <i className="bi bi-trash3-fill text-danger fs-5"></i>
                        </Button>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
          <ToastContainer />
          <style jsx>{`
            .product-table-container {
              padding: 1rem;
              overflow-x: auto; /* For responsiveness */
            }
            .product-table {
              width: 100%;
              border-collapse: collapse;
              margin: 1rem 0;
              font-size: 1rem;
              text-align: left;
            }
            .product-table thead {
              background-color: #2a9d8f;
              color: #fff;
            }
            .product-table th,
            .product-table td {
              border: 1px solid #ddd;
              padding: 0.75rem;
            }
            .product-table tbody tr:nth-child(odd) {
              background-color: #f9f9f9;
            }
            .product-table tbody tr:hover {
              background-color: #f1f1f1;
            }
            .product-table th {
              font-weight: bold;
            }
            .product-table td {
              color: #333;
            }
          `}</style>
        </div>
      </div>
    </>
  );
}
