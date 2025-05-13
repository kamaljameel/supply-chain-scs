import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { shippingTermsApi } from "@/utils/apiRoutes";
const ShippingTermsSelect = ({ formData, setFormData }) => {
  const [shippingTerms, setShippingTerms] = useState([]);
  const [newShippingTermsName, setnewShippingTermsName] = useState("");
  const [loading, setLoading] = useState(false);

  const abisolToken = localStorage.getItem("abisolToken");

  // Check if token exists, display an error message if not
  if (!abisolToken) {
    return <p>Error: No token found. Please log in.</p>;
  }

  // Load ShippingTerms on mount
  useEffect(() => {
    fetchShippingTerms();
  }, []);

  const fetchShippingTerms = () => {
    axios
      .get(shippingTermsApi, {
        headers: {
          Authorization: `Bearer ${abisolToken}`, // Use the token here
        },
      })
      .then((res) => {
        setShippingTerms(res.data);
        console.log("pportdata", res.data);
      })
      .catch((err) => console.error("Failed to load ShippingTerms", err));
  };

  // When a port is selected from the dropdown
  const handleSelectChange = (e) => {
    const selectedId = Number(e.target.value); // Convert to number for consistency
    const selectedPort = shippingTerms.find((p) => p.ID === selectedId);

    setFormData((prev) => ({
      ...prev,
      shippingTerms: selectedId,
      shippingTermsName: selectedPort?.Name || "",
    }));
    console.log("ShippingTerms", formData);
  };

  // Handle typing in the new port name
  const handleInputChange = (e) => {
    setnewShippingTermsName(e.target.value);
  };

  const handleAddShippingTerms = async () => {
    const trimmedShippingTermsName = newShippingTermsName.trim();
    if (!trimmedShippingTermsName) {
      return alert("Enter a ShippingTerms name first.");
    }

    // Prevent duplicate ShippingTerms
    const ShippingTermsExists = shippingTerms.some(
      (p) => p.Name.toLowerCase() === trimmedShippingTermsName.toLowerCase()
    );
    if (ShippingTermsExists) {
      return alert("ShippingTerms already exists.");
    }

    setLoading(true);
    try {
      // Step 1: Fetch existing ShippingTermss to calculate Serialno
      const existingShippingTermsRes = await axios.get(shippingTermsApi, {
        headers: {
          Authorization: `Bearer ${abisolToken}`,
        },
      });

      const existingShippingTerms = existingShippingTermsRes.data || [];

      const maxSerial = existingShippingTerms.reduce((max, shippingTerms) => {
        return shippingTerms.Serialno > max ? shippingTerms.Serialno : max;
      }, 0);

      const nextSerialno = maxSerial + 1;

      // Step 2: Add the new ShippingTerms
      const response = await axios.post(
        `${shippingTermsApi}/add`,
        {
          Name: trimmedShippingTermsName,
          isDisabled: false,
          Serialno: nextSerialno,
        },
        {
          headers: {
            Authorization: `Bearer ${abisolToken}`,
          },
        }
      );

      const newShippingTerms = response.data;
      setnewShippingTermsName(""); // Clear the input field

      // Refresh the ShippingTermss
      fetchShippingTerms();

      // Set the newly created ShippingTerms as selected
      setFormData((prev) => ({
        ...prev,
        shippingTerms: newShippingTerms.ID,
        shippingTermsName: newShippingTerms.Name,
      }));
    } catch (err) {
      console.error("Failed to add shippingTerms", err);
      alert("Failed to add shippingTerms.");
    }
    setLoading(false);
  };

  return (
    <>
      <Form.Group className="w-40">
        <Form.Label>Select Shipping Terms</Form.Label>
        <Form.Select
          name="shippingTerms"
          value={formData.shippingTerms || null}
          onChange={handleSelectChange}
        >
          <option value="">-- Select shipping Terms --</option>
          {shippingTerms.map((shippingTerms) => (
            <option key={shippingTerms.ID} value={shippingTerms.ID}>
              {shippingTerms.Name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="w-40">
        <Form.Label>Add New Shipping Terms </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter new ShippingTerms term"
          value={newShippingTermsName}
          onChange={handleInputChange}
          disabled={loading}
        />
      </Form.Group>

      <div>
        <Button
          variant="primary"
          className="fs-18"
          onClick={handleAddShippingTerms}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </Button>
      </div>
    </>
  );
};

export default ShippingTermsSelect;
