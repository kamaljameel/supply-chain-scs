// 6. controllers/fileController.js
const File = require("../models/File");
const fs = require("fs");
const path = require("path");

const fileController = {
  // Upload single file
  uploadFile: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      // Save file info to database
      const fileData = {
        originalName: req.file.originalname,
        fileName: req.file.filename,
        filePath: req.file.path,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
      };

      const savedFile = await File.create(fileData);

      res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        data: {
          id: savedFile.id,
          originalName: savedFile.originalName,
          fileName: savedFile.fileName,
          fileSize: savedFile.fileSize,
          mimeType: savedFile.mimeType,
          uploadedAt: savedFile.uploadedAt,
        },
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({
        success: false,
        message: "File upload failed",
        error: error.message,
      });
    }
  },

  // Upload multiple files
  uploadMultipleFiles: async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No files uploaded",
        });
      }

      const uploadedFiles = [];

      for (const file of req.files) {
        const fileData = {
          originalName: file.originalname,
          fileName: file.filename,
          filePath: file.path,
          fileSize: file.size,
          mimeType: file.mimetype,
        };

        const savedFile = await File.create(fileData);
        uploadedFiles.push({
          id: savedFile.id,
          originalName: savedFile.originalName,
          fileName: savedFile.fileName,
          fileSize: savedFile.fileSize,
          mimeType: savedFile.mimeType,
          uploadedAt: savedFile.uploadedAt,
        });
      }

      res.status(200).json({
        success: true,
        message: `${uploadedFiles.length} files uploaded successfully`,
        data: uploadedFiles,
      });
    } catch (error) {
      console.error("Multiple upload error:", error);
      res.status(500).json({
        success: false,
        message: "Files upload failed",
        error: error.message,
      });
    }
  },

  // Get all files
  getAllFiles: async (req, res) => {
    try {
      const files = await File.findAll({
        order: [["uploadedAt", "DESC"]],
      });

      res.status(200).json({
        success: true,
        data: files,
      });
    } catch (error) {
      console.error("Get files error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve files",
        error: error.message,
      });
    }
  },

  // Download file
  downloadFile: async (req, res) => {
    try {
      const { id } = req.params;
      const file = await File.findByPk(id);

      if (!file) {
        return res.status(404).json({
          success: false,
          message: "File not found",
        });
      }

      const filePath = path.resolve(file.filePath);

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          success: false,
          message: "File not found on server",
        });
      }

      res.download(filePath, file.originalName);
    } catch (error) {
      console.error("Download error:", error);
      res.status(500).json({
        success: false,
        message: "File download failed",
        error: error.message,
      });
    }
  },

  // Delete file
  deleteFile: async (req, res) => {
    try {
      const { id } = req.params;
      const file = await File.findByPk(id);

      if (!file) {
        return res.status(404).json({
          success: false,
          message: "File not found",
        });
      }

      // Delete file from filesystem
      if (fs.existsSync(file.filePath)) {
        fs.unlinkSync(file.filePath);
      }

      // Delete from database
      await file.destroy();

      res.status(200).json({
        success: true,
        message: "File deleted successfully",
      });
    } catch (error) {
      console.error("Delete error:", error);
      res.status(500).json({
        success: false,
        message: "File deletion failed",
        error: error.message,
      });
    }
  },
};

module.exports = fileController;
