// 11. components/FileUpload.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import {
  fetchFileApi,
  deleteFileApi,
  downloadFileApi,
} from "@/utils/apiRoutes";
const FileUploadList = ({ refreshfileKey }) => {
  // const [file, setFile] = useState(null);
  //   const [files, setFiles] = useState([]);
  // const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [message, setMessage] = useState("");

  // Handle single file selection
  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  // // Handle multiple files selection
  // //   const handleMultipleFilesChange = (e) => {
  // //     setFiles(Array.from(e.target.files));
  // //   };

  // // Upload single file
  // const uploadSingleFile = async () => {
  //   if (!file) {
  //     setMessage("Please select a file");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("file", file);

  //   setUploading(true);
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3001/api/upload",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     setMessage("File uploaded successfully!");
  //     setFile(null);
  //     fetchUploadedFiles();
  //   } catch (error) {
  //     setMessage(
  //       "Upload failed: " + (error.response?.data?.message || error.message)
  //     );
  //   }
  //   setUploading(false);
  // };

  // Upload multiple files
  //   const uploadMultipleFiles = async () => {
  //     if (files.length === 0) {
  //       setMessage("Please select files");
  //       return;
  //     }

  //     const formData = new FormData();
  //     files.forEach((file) => {
  //       formData.append("files", file);
  //     });

  //     setUploading(true);
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:3001/api/upload-multiple",
  //         formData,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );

  //       setMessage(`${files.length} files uploaded successfully!`);
  //       setFiles([]);
  //       fetchUploadedFiles();
  //     } catch (error) {
  //       setMessage(
  //         "Upload failed: " + (error.response?.data?.message || error.message)
  //       );
  //     }
  //     setUploading(false);
  //   };

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
      {/* <h1>File Upload System</h1> */}

      {/* Single File Upload */}
      {/* <div
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
      </div> */}

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

      {/* Uploaded Files List */}
      <hr className="my-4" />
      <div className="table-container shadow-sm rounded p-3">
        <h5 className="mb-4">Uploaded Files</h5>
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
                        {/* <button
                        onClick={() => downloadFile(file.id, file.originalName)}
                        style={{ marginRight: "5px", padding: "5px 10px" }}
                      >
                        Download
                      </button> */}
                        <button
                          className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
                          onClick={() =>
                            downloadFile(file.id, file.originalName)
                          }
                        >
                          <i className="bi bi-download"></i> Download
                        </button>
                        <button
                          onClick={() => deleteFile(file.id)}
                          className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                        >
                          <i className="bi bi-trash"></i> Delete
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
