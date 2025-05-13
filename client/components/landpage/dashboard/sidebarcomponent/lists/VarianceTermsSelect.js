import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { varianceTermsApi } from "@/utils/apiRoutes";
const VarianceTermsSelect = ({ formData, setFormData }) => {
  const [varianceTerms, setVarianceTerms] = useState([]);
  const [newVarianceTermsName, setnewVarianceTermsName] = useState("");
  const [loading, setLoading] = useState(false);

  const abisolToken = localStorage.getItem("abisolToken");

  // Check if token exists, display an error message if not
  if (!abisolToken) {
    return <p>Error: No token found. Please log in.</p>;
  }

  // Load VarianceTerms on mount
  useEffect(() => {
    fetchVarianceTerms();
  }, []);

  const fetchVarianceTerms = () => {
    axios
      .get(varianceTermsApi, {
        headers: {
          Authorization: `Bearer ${abisolToken}`, // Use the token here
        },
      })
      .then((res) => {
        setVarianceTerms(res.data);
        console.log("pportdata", res.data);
      })
      .catch((err) => console.error("Failed to load VarianceTerms", err));
  };

  // When a port is selected from the dropdown
  const handleSelectChange = (e) => {
    const selectedId = Number(e.target.value); // Convert to number for consistency
    const selectedPort = varianceTerms.find((p) => p.ID === selectedId);

    setFormData((prev) => ({
      ...prev,
      varianceTerms: selectedId,
      varianceTermsName: selectedPort?.Name || "",
    }));
    console.log("VarianceTerms", formData);
  };

  // Handle typing in the new port name
  const handleInputChange = (e) => {
    setnewVarianceTermsName(e.target.value);
  };

  const handleAddVarianceTerms = async () => {
    const trimmedVarianceTermsName = newVarianceTermsName.trim();
    if (!trimmedVarianceTermsName) {
      return alert("Enter a VarianceTerms name first.");
    }

    // Prevent duplicate VarianceTerms
    const VarianceTermsExists = varianceTerms.some(
      (p) => p.Name.toLowerCase() === trimmedVarianceTermsName.toLowerCase()
    );
    if (VarianceTermsExists) {
      return alert("VarianceTerms already exists.");
    }

    setLoading(true);
    try {
      // Step 1: Fetch existing VarianceTermss to calculate Serialno
      const existingVarianceTermsRes = await axios.get(varianceTermsApi, {
        headers: {
          Authorization: `Bearer ${abisolToken}`,
        },
      });

      const existingVarianceTerms = existingVarianceTermsRes.data || [];

      const maxSerial = existingVarianceTerms.reduce((max, varianceTerms) => {
        return varianceTerms.Serialno > max ? varianceTerms.Serialno : max;
      }, 0);

      const nextSerialno = maxSerial + 1;

      // Step 2: Add the new VarianceTerms
      const response = await axios.post(
        `${varianceTermsApi}/add`,
        {
          Name: trimmedVarianceTermsName,
          isDisabled: false,
          Serialno: nextSerialno,
        },
        {
          headers: {
            Authorization: `Bearer ${abisolToken}`,
          },
        }
      );

      const newVarianceTerms = response.data;
      setnewVarianceTermsName(""); // Clear the input field

      // Refresh the VarianceTermss
      fetchVarianceTerms();

      // Set the newly created VarianceTerms as selected
      setFormData((prev) => ({
        ...prev,
        varianceTerms: newVarianceTerms.ID,
        varianceTermsName: newVarianceTerms.Name,
      }));
    } catch (err) {
      console.error("Failed to add VarianceTerms", err);
      alert("Failed to add VarianceTerms.");
    }
    setLoading(false);
  };

  return (
    <>
      <Form.Group className="w-40">
        <Form.Label>Select Variance Terms</Form.Label>
        <Form.Select
          name="VarianceTerms"
          value={formData.varianceTerms || null}
          onChange={handleSelectChange}
        >
          <option value="">-- Select varianceTerms --</option>
          {varianceTerms.map((varianceTerms) => (
            <option key={varianceTerms.ID} value={varianceTerms.ID}>
              {varianceTerms.Name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="w-40">
        <Form.Label>Add New Variance Terms </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter new VarianceTerms term"
          value={newVarianceTermsName}
          onChange={handleInputChange}
          disabled={loading}
        />
      </Form.Group>

      <div>
        <Button
          variant="primary"
          className="fs-18"
          onClick={handleAddVarianceTerms}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </Button>
      </div>
    </>
  );
};

export default VarianceTermsSelect;
