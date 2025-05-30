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

  // Handle multiple files selection
  //   const handleMultipleFilesChange = (e) => {
  //     setFiles(Array.from(e.target.files));
  //   };

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
        <h1>File Upload System</h1>

        {/* Single File Upload */}
        <div
          style={{
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        >
          <h2>Single File Upload</h2>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.gif"
          />
          <button
            onClick={uploadSingleFile}
            disabled={uploading}
            style={{ marginLeft: "10px", padding: "10px 20px" }}
          >
            {uploading ? "Uploading..." : "Upload File"}
          </button>
        </div>

        {/* Multiple Files Upload */}
        {/* <div
        style={{
          marginBottom: "30px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      >
        <h2>Multiple Files Upload</h2>
        <input
          type="file"
          multiple
          onChange={handleMultipleFilesChange}
          accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.gif"
        />
        <button
          onClick={uploadMultipleFiles}
          disabled={uploading}
          style={{ marginLeft: "10px", padding: "10px 20px" }}
        >
          {uploading ? "Uploading..." : "Upload Files"}
        </button>
      </div> */}

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
