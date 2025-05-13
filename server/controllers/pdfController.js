const path = require("path");
const fs = require("fs");
const PDF = require("../models/PDF");
// Handle PDF upload
exports.uploadPDF = (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "No PDF file uploaded" });
  }

  const filePath = path.join(__dirname, "../", req.file.path);

  // Here you could process the PDF (e.g., extract text, add metadata, etc.)
  // For now, let's just return a success message with the file details
  res.status(200).json({
    message: "PDF uploaded successfully",
    fileName: req.file.originalname,
    filePath: filePath,
  });
};

// Get all PDFs for a user
exports.getPDFsByUser = (req, res) => {
  const userId = req.params.userId;

  // This should query your database for PDFs belonging to the given userId
  // Assuming you have a model like `PDF` to interact with your database
  PDF.findAll({ where: { userId } })
    .then((pdfs) => {
      if (pdfs.length === 0) {
        return res.status(404).send({ message: "No PDFs found for this user" });
      }
      res.status(200).json(pdfs);
    })
    .catch((err) => {
      console.error("Error fetching PDFs:", err);
      res.status(500).send({ message: "Error fetching PDFs" });
    });
};

// Get a single PDF by ID
exports.getPDFById = (req, res) => {
  const pdfId = req.params.id;

  // Query your database or file storage system for the PDF by ID
  PDF.findByPk(pdfId)
    .then((pdf) => {
      if (!pdf) {
        return res.status(404).send({ message: "PDF not found" });
      }
      res.status(200).json(pdf);
    })
    .catch((err) => {
      console.error("Error fetching PDF by ID:", err);
      res.status(500).send({ message: "Error fetching PDF" });
    });
};

// Update a specific PDF
exports.updatePDF = (req, res) => {
  const pdfId = req.params.id;
  const { title, description } = req.body;

  // Update the PDF metadata in your database
  PDF.findByPk(pdfId)
    .then((pdf) => {
      if (!pdf) {
        return res.status(404).send({ message: "PDF not found" });
      }

      pdf
        .update({ title, description })
        .then((updatedPdf) => {
          res.status(200).json(updatedPdf);
        })
        .catch((err) => {
          console.error("Error updating PDF:", err);
          res.status(500).send({ message: "Error updating PDF" });
        });
    })
    .catch((err) => {
      console.error("Error fetching PDF for update:", err);
      res.status(500).send({ message: "Error fetching PDF for update" });
    });
};
// Get all PDFs
exports.getAllPDFs = (req, res) => {
  PDF.findAll()
    .then((pdfs) => {
      if (pdfs.length === 0) {
        return res.status(404).send({ message: "No PDFs found" });
      }
      res.status(200).json(pdfs);
    })
    .catch((err) => {
      console.error("Error fetching all PDFs:", err);
      res.status(500).send({ message: "Error fetching PDFs" });
    });
};
exports.getAllUploadedPDFs = (req, res) => {
  const uploadDir = path.join(__dirname, "../uploads");

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error("Error reading upload directory:", err);
      return res
        .status(500)
        .json({ message: "Error reading upload directory" });
    }

    if (files.length === 0) {
      return res.status(404).json({ message: "No uploaded files found" });
    }

    const fileList = files.map((file) => ({
      fileName: file,
      fileUrl: `${req.protocol}://${req.get("host")}/uploads/${file}`,
    }));

    res.status(200).json(fileList);
  });
};
// Optionally: Delete a PDF
// exports.deletePDF = (req, res) => {
//   const pdfId = req.params.id;

//   // Delete the PDF from the database
//   PDF.destroy({ where: { id: pdfId } })
//     .then((deletedCount) => {
//       if (deletedCount === 0) {
//         return res.status(404).send({ message: "PDF not found" });
//       }
//       res.status(200).send({ message: "PDF deleted successfully" });
//     })
//     .catch((err) => {
//       console.error("Error deleting PDF:", err);
//       res.status(500).send({ message: "Error deleting PDF" });
//     });
// };
