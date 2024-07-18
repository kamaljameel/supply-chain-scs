const BusinessInquiry = require("../models/BusinessInquiry");
const axios = require("axios");
const { sendEmail } = require("../services/emailService"); // Assuming emailService.js is implemented as shown later

// Create a new business inquiry
exports.createBusinessInquiry = async (req, res) => {
  const {
    BusinessName,
    FirstName,
    OfficialEmail,
    PersonalMobile1,
    InquiryLine,
    Description,
    InterestedInName,
  } = req.body;

  const data = JSON.stringify({
    BusinessName: BusinessName || "",
    FirstName: FirstName,
    OfficialEmail: OfficialEmail,
    PersonalMobile1: PersonalMobile1,
    InquiryLine: InquiryLine,
    Description: Description,
    InterestedInName: InterestedInName || "",
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.abisolcrm.com.au/v1/CreateQuickInquiry",
    headers: {
      "x-api-key": "75c8f08c5ae14bac9a0ec3f2d1c06b0e",
      "Content-Type": "application/json",
    },
    data: data,
  };
  try {
    const response = await axios(config);

    const inquiry = await BusinessInquiry.create({
      BusinessName,
      FirstName,
      OfficialEmail,
      PersonalMobile1,
      InquiryLine,
      Description,
      InterestedInName,
    });
    const emailContent = `
    <h1>New Business Inquiry Received</h1>
    <p><strong>Business Name:</strong> ${BusinessName || "-"}</p>
    <p><strong>Contact Name:</strong> ${FirstName}</p>
    <p><strong>Email:</strong> ${OfficialEmail}</p>
    <p><strong>Phone:</strong> ${PersonalMobile1}</p>
    <p><strong>Inquiry Line:</strong> ${InquiryLine}</p>
    <p><strong>Description:</strong></p>
    <p>${Description}</p>
    <p><strong>Interested In:</strong> ${InterestedInName || "-"}</p>
  `;
    // Example: Send email with inquiry details
    await sendEmail({
      to: `info@i-scs.co.uk, kamaljameel14@gmail.com`,
      subject: "New Business Inquiry",
      html: emailContent,
    });

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
