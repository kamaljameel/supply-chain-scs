// import { useEffect, useState } from "react";
// import Form from "react-bootstrap/Form";
// import axios from "axios";

// const PortOfLoadingSelect = ({ formData, setFormData }) => {
//   const [ports, setPorts] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/api/portOfLoading")
//       .then((res) => setPorts(res.data))
//       .catch((err) => console.error("Failed to load ports", err));
//   }, []);

//   const handlePortChange = (e) => {
//     const selectedId = e.target.value;
//     setFormData((prev) => ({
//       ...prev,
//       portOfLoading: selectedId, // Store the ID
//     }));
//   };

//   return (
//     <Form.Group>
//       <Form.Label>Port of Loading</Form.Label>
//       <Form.Select
//         name="portOfLoading"
//         value={formData.portOfLoading || ""}
//         onChange={handlePortChange}
//       >
//         <option value="">-- Select Port --</option>
//         {ports.map((port) => (
//           <option key={port.ID} value={port.ID}>
//             {port.Name}
//           </option>
//         ))}
//       </Form.Select>
//     </Form.Group>
//   );
// };

// export default PortOfLoadingSelect;

import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

const PortOfLoadingSelect = ({ formData, setFormData }) => {
  const [ports, setPorts] = useState([]);
  const [newPortName, setNewPortName] = useState("");
  const [loading, setLoading] = useState(false);

  const abisolToken = localStorage.getItem("abisolToken");

  // Check if token exists, display an error message if not
  if (!abisolToken) {
    return <p>Error: No token found. Please log in.</p>;
  }

  // Load ports on mount
  useEffect(() => {
    fetchPorts();
  }, []);

  const fetchPorts = () => {
    axios
      .get("http://localhost:3001/api/portOfLoading", {
        headers: {
          Authorization: `Bearer ${abisolToken}`, // Use the token here
        },
      })
      .then((res) => {
        setPorts(res.data);
        console.log("pportdata", res.data);
      })
      .catch((err) => console.error("Failed to load ports", err));
  };

  // When a port is selected from the dropdown
  const handleSelectChange = (e) => {
    const selectedId = Number(e.target.value); // Convert to number for consistency
    const selectedPort = ports.find((p) => p.ID === selectedId);

    setFormData((prev) => ({
      ...prev,
      portOfLoading: selectedId,
      portOfLoadingName: selectedPort?.Name || "",
    }));
    console.log("porrtt", formData);
  };

  // Handle typing in the new port name
  const handleInputChange = (e) => {
    setNewPortName(e.target.value);
  };

  // Add a new port via the API
  // const handleAddPort = async () => {
  //   const trimmedPortName = newPortName.trim();
  //   if (!trimmedPortName) {
  //     return alert("Enter a port name first.");
  //   }

  //   // Prevent duplicate ports
  //   const portExists = ports.some(
  //     (p) => p.Name.toLowerCase() === trimmedPortName.toLowerCase()
  //   );
  //   if (portExists) {
  //     return alert("Port already exists.");
  //   }

  //   setLoading(true);
  //   try {
  //     // Make the API request to add the new port
  //     const response = await axios.post(
  //       "http://localhost:3001/api/portOfLoading/add",
  //       {
  //         Name: trimmedPortName,
  //         // Additional fields like isDisabled, Serialno can be added here if needed
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${abisolToken}`, // Ensure the token is added to the header
  //         },
  //       }
  //     );

  //     const newPort = response.data;
  //     setNewPortName(""); // Clear the input field

  //     // Refresh the ports
  //     fetchPorts();

  //     // Set the newly created port as selected
  //     setFormData((prev) => ({
  //       ...prev,
  //       portOfLoading: newPort.ID,
  //       portOfLoadingName: newPort.Name,
  //     }));
  //   } catch (err) {
  //     console.error("Failed to add port", err);
  //   }
  //   setLoading(false);
  // };
  const handleAddPort = async () => {
    const trimmedPortName = newPortName.trim();
    if (!trimmedPortName) {
      return alert("Enter a port name first.");
    }

    // Prevent duplicate ports
    const portExists = ports.some(
      (p) => p.Name.toLowerCase() === trimmedPortName.toLowerCase()
    );
    if (portExists) {
      return alert("Port already exists.");
    }

    setLoading(true);
    try {
      // Step 1: Fetch existing ports to calculate Serialno
      const existingPortsRes = await axios.get(
        "http://localhost:3001/api/portOfLoading",
        {
          headers: {
            Authorization: `Bearer ${abisolToken}`,
          },
        }
      );

      const existingPorts = existingPortsRes.data || [];

      const maxSerial = existingPorts.reduce((max, port) => {
        return port.Serialno > max ? port.Serialno : max;
      }, 0);

      const nextSerialno = maxSerial + 1;

      // Step 2: Add the new port
      const response = await axios.post(
        "http://localhost:3001/api/portOfLoading/add",
        {
          Name: trimmedPortName,
          isDisabled: false,
          Serialno: nextSerialno,
        },
        {
          headers: {
            Authorization: `Bearer ${abisolToken}`,
          },
        }
      );

      const newPort = response.data;
      setNewPortName(""); // Clear the input field

      // Refresh the ports
      fetchPorts();

      // Set the newly created port as selected
      setFormData((prev) => ({
        ...prev,
        portOfLoading: newPort.ID,
        portOfLoadingName: newPort.Name,
      }));
    } catch (err) {
      console.error("Failed to add port", err);
      alert("Failed to add port.");
    }
    setLoading(false);
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Select Port of Loading</Form.Label>
        <Form.Select
          name="portOfLoading"
          value={formData.portOfLoading || null}
          onChange={handleSelectChange}
        >
          <option value="">-- Select Port --</option>
          {ports.map((port) => (
            <option key={port.ID} value={port.ID}>
              {port.Name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Add New Port of Loading</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter new port name"
          value={newPortName}
          onChange={handleInputChange}
          disabled={loading}
        />
      </Form.Group>

      <Button variant="primary" onClick={handleAddPort} disabled={loading}>
        {loading ? "Adding..." : "Add Port"}
      </Button>
    </>
  );
};

export default PortOfLoadingSelect;
