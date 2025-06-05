import { useState } from "react";
import axios from "axios";
import { uploadFileApi } from "@/utils/apiRoutes";
export default function FileUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  //   const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState("");

  // Handle single file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Upload single file

  const uploadSingleFile = async () => {
    if (!file) {
      setMessage("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const response = await axios.post(uploadFileApi, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("File uploaded successfully!");
      setFile(null);
      if (onUploadSuccess) {
        onUploadSuccess(); // trigger refresh in parent
        console.log("trigger refresh in parent");
      }
    } catch (error) {
      setMessage(
        "Upload failed: " + (error.response?.data?.message || error.message)
      );
    }
    setUploading(false);
  };
  return (
    <div>
      <div style={{ margin: "0 auto" }}>
        <h5> File Upload here</h5>
        {/* Single File Upload */}
        <div className="d-flex justify-content-between align-items-center gap-2 border rounded-2 p-3 mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.gif"
            className=" w-50"
          />
          <button
            onClick={uploadSingleFile}
            disabled={uploading}
            className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1 p-2 shadow"
          >
            <i className="bi bi-cloud-arrow-up-fill"></i>{" "}
            {uploading ? "Uploading..." : "Upload File"}
          </button>
        </div>

        {/* Message */}
        {message && (
          <div
            style={{
              padding: "10px",
              marginBottom: "20px",
              backgroundColor: "#f0f0f0",
              borderRadius: "5px",
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
