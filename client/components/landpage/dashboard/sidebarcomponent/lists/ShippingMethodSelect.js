import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { shippingMethodApi } from "@/utils/apiRoutes";
const ShippingMethodSelect = ({ formData, setFormData }) => {
  const [shippingMethod, setShippingMethod] = useState([]);
  const [newShippingMethodName, setnewShippingMethodName] = useState("");
  const [loading, setLoading] = useState(false);

  const abisolToken = localStorage.getItem("abisolToken");

  // Check if token exists, display an error message if not
  if (!abisolToken) {
    return <p>Error: No token found. Please log in.</p>;
  }

  // Load ShippingMethod on mount
  useEffect(() => {
    fetchShippingMethod();
  }, []);

  const fetchShippingMethod = () => {
    axios
      .get(shippingMethodApi, {
        headers: {
          Authorization: `Bearer ${abisolToken}`, // Use the token here
        },
      })
      .then((res) => {
        setShippingMethod(res.data);
        console.log("pportdata", res.data);
      })
      .catch((err) => console.error("Failed to load ShippingMethod", err));
  };

  // When a port is selected from the dropdown
  const handleSelectChange = (e) => {
    const selectedId = Number(e.target.value); // Convert to number for consistency
    const selectedShippingMethod = shippingMethod.find(
      (p) => p.ID === selectedId
    );

    setFormData((prev) => ({
      ...prev,
      shippingMethod: selectedId,
      shippingMethodName: selectedShippingMethod?.Name || "",
    }));
    console.log("ShippingMethod", formData);
  };

  // Handle typing in the new port name
  const handleInputChange = (e) => {
    setnewShippingMethodName(e.target.value);
  };

  const handleAddShippingMethod = async () => {
    const trimmedShippingMethodName = newShippingMethodName.trim();
    if (!trimmedShippingMethodName) {
      return alert("Enter a ShippingMethod name first.");
    }

    // Prevent duplicate ShippingMethod
    const ShippingMethodExists = shippingMethod.some(
      (p) => p.Name.toLowerCase() === trimmedShippingMethodName.toLowerCase()
    );
    if (ShippingMethodExists) {
      return alert("ShippingMethod already exists.");
    }

    setLoading(true);
    try {
      // Step 1: Fetch existing ShippingMethods to calculate Serialno
      const existingShippingMethodRes = await axios.get(shippingMethodApi, {
        headers: {
          Authorization: `Bearer ${abisolToken}`,
        },
      });

      const existingShippingMethod = existingShippingMethodRes.data || [];

      const maxSerial = existingShippingMethod.reduce((max, shippingMethod) => {
        return shippingMethod.Serialno > max ? shippingMethod.Serialno : max;
      }, 0);

      const nextSerialno = maxSerial + 1;

      // Step 2: Add the new ShippingMethod
      const response = await axios.post(
        `${shippingMethodApi}/add`,
        {
          Name: trimmedShippingMethodName,
          isDisabled: false,
          Serialno: nextSerialno,
        },
        {
          headers: {
            Authorization: `Bearer ${abisolToken}`,
          },
        }
      );

      const newShippingMethod = response.data;
      setnewShippingMethodName(""); // Clear the input field

      // Refresh the ShippingMethods
      fetchShippingMethod();

      // Set the newly created ShippingMethod as selected
      setFormData((prev) => ({
        ...prev,
        shippingMethod: newShippingMethod.ID,
        shippingMethodName: newShippingMethod.Name,
      }));
    } catch (err) {
      console.error("Failed to add ShippingMethod", err);
      alert("Failed to add ShippingMethod.");
    }
    setLoading(false);
  };

  return (
    <>
      <Form.Group className="w-40">
        <Form.Label>Select Shipping Method</Form.Label>
        <Form.Select
          name="shippingMethod"
          value={formData.shippingMethod || null}
          onChange={handleSelectChange}
        >
          <option value="">-- Select shipping Terms --</option>
          {shippingMethod.map((shippingMethod) => (
            <option key={shippingMethod.ID} value={shippingMethod.ID}>
              {shippingMethod.Name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="w-40">
        <Form.Label>Add New Shipping Method </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter new ShippingMethod term"
          value={newShippingMethodName}
          onChange={handleInputChange}
          disabled={loading}
        />
      </Form.Group>

      <div>
        <Button
          variant="primary"
          className="fs-18"
          onClick={handleAddShippingMethod}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </Button>
      </div>
    </>
  );
};

export default ShippingMethodSelect;
