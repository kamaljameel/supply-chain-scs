import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack";
import Tesseract from "tesseract.js";
import mammoth from "mammoth";
import * as XLSX from "xlsx";
import { Form, Button } from "react-bootstrap";

export default function FileUploadForm({ setFormData }) {
  const [file, setFile] = useState(null);
  // const [formData, setFormData] = useState({
  //   name: "",
  //   address: "",
  //   phone: "",
  //   email: "",
  // });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null); // Reset error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file.");
      return;
    }

    setLoading(true);
    const fileExt = file.name.split(".").pop().toLowerCase();

    try {
      if (fileExt === "pdf") {
        await processPDF(file);
      } else if (fileExt === "docx") {
        await processDOCX(file);
      } else if (fileExt === "xlsx") {
        await processXLSX(file);
      } else if (["png", "jpg", "jpeg"].includes(fileExt)) {
        await processImage(file);
      } else {
        setError("Unsupported file format.");
      }
    } catch (err) {
      setError("Failed to process the file: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const processPDF = async (file) => {
    const reader = new FileReader();
    reader.onload = async function () {
      const arrayBuffer = reader.result;

      try {
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let extractedText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(" ");
          extractedText += pageText + "\n";
        }

        if (!extractedText.trim()) {
          throw new Error("No text extracted from PDF.");
        }

        setFormData({
          sellerAddress: extractField(extractedText, "Address:"),
          // address: extractField(extractedText, "Address:"),
          phone: extractField(extractedText, "Phone:"),
          email: extractField(extractedText, "Email:"),
        });
      } catch (error) {
        console.error("PDF extraction error:", error);
        setError("Error extracting text from PDF: " + error.message);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // const processImage = async (file) => {
  //   Tesseract.recognize(file, "eng")
  //     .then(({ data: { text } }) => {
  //       setFormData({
  //         name: extractField(text, "Name:"),
  //         address: extractField(text, "Address:"),
  //         phone: extractField(text, "Phone:"),
  //         email: extractField(text, "Email:"),
  //       });
  //     })
  //     .catch((err) => {
  //       console.error("OCR error:", err);
  //       setError("OCR failed. Ensure the file contains text.");
  //     });
  // };

  const processDOCX = async (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const arrayBuffer = e.target.result;
      const { value: text } = await mammoth.extractRawText({ arrayBuffer });
      setFormData({
        sellerAddress: extractField(text, "Address:"),
        // address: extractField(text, "Address:"),
        phone: extractField(text, "Phone:"),
        email: extractField(text, "Email:"),
      });
    };
    reader.readAsArrayBuffer(file);
  };

  const processXLSX = async (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(sheet);
      const firstRow = rows[0] || {};

      setFormData({
        sellerAddress: firstRow.Address || "N/A",
        // address: firstRow.Address || "N/A",
        phone: firstRow.Phone || "N/A",
        email: firstRow.Email || "N/A",
      });
    };
    reader.readAsArrayBuffer(file);
  };

  const extractField = (text, fieldName) => {
    const regex = new RegExp(`${fieldName}\\s*(.*)`, "i");
    const match = text.match(regex);
    return match ? match[1].trim() : "N/A";
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <input
        type="file"
        accept=".pdf,.docx,.xlsx,.png,.jpg,.jpeg"
        onChange={handleFileChange}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Processing..." : "Upload File"}
      </button> */}

      <Form.Label>Attach Performa Invoice</Form.Label>
      <div className="d-flex">
        <Form.Control
          type="file"
          accept=".pdf,.docx,.xlsx,.png,.jpg,.jpeg"
          onChange={handleFileChange}
          className="w-auto"
        />
        <Button
          type="submit"
          disabled={loading}
          className="mt-0 px-3  text-white  border-0 rounded-3 ms-1 w-auto"
          variant="primary"
        >
          {loading ? "Processing..." : "Upload File"}
        </Button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* <div>
        <label>Name</label>
        <input type="text" value={formData.name} readOnly />
      </div>
      <div>
        <label>Address</label>
        <input type="text" value={formData.address} readOnly />
      </div>
      <div>
        <label>Phone</label>
        <input type="text" value={formData.phone} readOnly />
      </div>
      <div>
        <label>Email</label>
        <input type="text" value={formData.email} readOnly />
      </div> */}
    </form>
  );
}
