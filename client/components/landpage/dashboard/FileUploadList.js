// 11. components/FileUpload.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import {
  fetchFileApi,
  deleteFileApi,
  downloadFileApi,
} from "@/utils/apiRoutes";
const FileUploadList = ({ refreshfileKey }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch uploaded files
  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get(fetchFileApi);
      setUploadedFiles(response.data.data);
    } catch (error) {
      console.error("Failed to fetch files:", error);
    }
  };

  // Download file
  const downloadFile = async (id, filename) => {
    try {
      const response = await axios.get(downloadFileApi(id), {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  // Delete file
  const deleteFile = async (id) => {
    try {
      await axios.delete(deleteFileApi(id));
      setMessage("File deleted successfully");
      fetchUploadedFiles();
    } catch (error) {
      setMessage(
        "Delete failed: " + (error.response?.data?.message || error.message)
      );
    }
  };

  // Load files on component mount
  useState(() => {
    fetchUploadedFiles();
  }, []);
  useEffect(() => {
    fetchUploadedFiles();
    console.log("trigger refresh list");
  }, [refreshfileKey]);
  return (
    <div style={{ maxWidth: "100%", margin: "0 auto" }}>
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

      {/* Uploaded Files List */}
      <hr className="my-4" />
      <div className="table-container shadow-sm rounded p-3">
        <h5 className="mb-4">Import Documents</h5>
        {uploadedFiles.length > 0 ? (
          <div className="table-responsive datatable-container">
            <table
              className="table table-striped table-hover  text-center align-middle"
              style={{ width: "100%", borderCollapse: "collapse" }}
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Size</th>
                  <th>Type</th>
                  <th>Upload Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {uploadedFiles.map((file) => (
                  <tr key={file.id}>
                    <td>{file.originalName}</td>
                    <td>{(file.fileSize / 1024).toFixed(2)} KB</td>
                    <td>{file.mimeType}</td>
                    <td>{new Date(file.uploadedAt).toLocaleDateString()}</td>
                    <td>
                      <div className="d-flex justify-content-center gap-2 p-2 ">
                        <button
                          className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
                          onClick={() =>
                            downloadFile(file.id, file.originalName)
                          }
                        >
                          <i className="bi bi-download"></i>
                        </button>
                        <button
                          onClick={() => deleteFile(file.id)}
                          className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-3 text-center border rounded-2">
            <p className="fs-5 fw-medium text-danger mb-0">
              No files uploaded yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadList;
