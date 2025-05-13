const BusinessInquiry = require("../models/BusinessInquiry");
const axios = require("axios");
const { sendEmail } = require("../services/emailService");
require("dotenv").config();
// Create a new business inquiry
exports.createBusinessInquiry = async (req, res) => {
  const {
    FirstName,
    LastName,
    PersonalEmail1,
    PersonalMobile1,
    InterestedInName,
    Remarks,
    EstimatedRevenue,
    LeadSourceName,
  } = req.body;

  const data = JSON.stringify({
    FirstName: FirstName,
    LastName: LastName || "",
    PersonalEmail1: PersonalEmail1,
    PersonalMobile1: PersonalMobile1,
    InterestedInName: InterestedInName || "",
    Remarks: Remarks || "",
    EstimatedRevenue: EstimatedRevenue || 0,
    LeadSourceName: LeadSourceName || "",
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    // url: "https://api.abisolcrm.com.au/v1/CreateQuickInquiry",
    url: "https://api.abisolcrm.com.au/v1/CreateLead",
    headers: {
      // "x-api-key": "75c8f08c5ae14bac9a0ec3f2d1c06b0e",
      // "x-api-key": "7d771e41bb5c449582122749df6bc0a3",
      "x-api-key": process.env.X_API_KEY,
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios(config);

    const inquiry = await BusinessInquiry.create({
      FirstName,
      LastName,
      PersonalEmail1,
      PersonalMobile1,
      InterestedInName,
      Remarks,
      EstimatedRevenue,
      LeadSourceName,
    });

    const emailContent = `
      <h1>New Business Inquiry Received</h1>
      <p><strong>First Name:</strong> ${FirstName}</p>
      <p><strong>Last Name:</strong> ${LastName || "-"}</p>
      <p><strong>Email:</strong> ${PersonalEmail1}</p>
      <p><strong>Phone:</strong> ${PersonalMobile1}</p>
      <p><strong>Interested In:</strong> ${InterestedInName || "-"}</p>
      <p><strong>Remarks:</strong> ${Remarks || "-"}</p>
      <p><strong>Estimated Revenue:</strong> ${EstimatedRevenue || "-"}</p>
      <p><strong>Lead Source:</strong> ${LeadSourceName || "-"}</p>
    `;

    await sendEmail({
      to: `info@i-scs.co.uk`,
      subject: "New Business Inquiry",
      html: emailContent,
    });
    // await sendEmail({
    //   to: `kamaljameel14@gmail.com`,
    //   subject: "New Business Inquiry",
    //   html: emailContent,
    // });

    res.status(201).json({ inquiry, externalResponse: response.data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all business inquiries
exports.getAllBusinessInquiries = async (req, res) => {
  try {
    const inquiries = await BusinessInquiry.findAll();
    res.status(200).json(inquiries);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single business inquiry by ID
exports.getBusinessInquiryById = async (req, res) => {
  try {
    const inquiry = await BusinessInquiry.findByPk(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ error: "Business Inquiry not found" });
    }
    res.status(200).json(inquiry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a business inquiry by ID
exports.updateBusinessInquiry = async (req, res) => {
  try {
    const [updated] = await BusinessInquiry.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ error: "Business Inquiry not found" });
    }
    const updatedInquiry = await BusinessInquiry.findByPk(req.params.id);
    res.status(200).json(updatedInquiry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a business inquiry by ID
exports.deleteBusinessInquiry = async (req, res) => {
  try {
    const deleted = await BusinessInquiry.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ error: "Business Inquiry not found" });
    }
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
