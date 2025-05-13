const nodemailer = require("nodemailer");
const fs = require("fs");
require("dotenv").config();

exports.sendEmailWithPDF = async (req, res) => {
  if (!req.file || !req.body.email) {
    return res
      .status(400)
      .json({ message: "PDF file and email are required." });
  }

  const { email } = req.body;
  const pdfPath = req.file.path;

  // Configure Nodemailer
  // const transporter = nodemailer.createTransport({
  //   host: "i-scs.co.uk",
  //   port: 465,
  //   secure: true, // Use SSL
  //   auth: {
  //     user: "info@i-scs.co.uk",
  //     pass: "LahoreSupplyChain@123",
  //   },
  // });
  var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "8e328a1d70450f",
      pass: "ae7055397aeff3",
    },
  });
  const mailOptions = {
    from: "info@i-scs.co.uk",
    to: email,
    subject: "Your PDF Invoice",
    text: "Please find the attached invoice.",
    attachments: [{ filename: "invoice.pdf", path: pdfPath }],
  };

  try {
    await transporter.sendMail(mailOptions);
    // fs.unlinkSync(pdfPath); // Delete file after sending
    res.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
};
