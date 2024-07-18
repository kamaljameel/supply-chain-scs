const nodemailer = require("nodemailer");

// Create a transporter
const transporter = nodemailer.createTransport({
  host: "i-scs.co.uk",
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: "info@i-scs.co.uk",
    pass: "LahoreSupplyChain@123",
  },
});

// Function to send email
exports.sendEmail = async ({ to, subject, html }) => {
  try {
    // Send mail with defined transport object
    await transporter.sendMail({
      from: "info@i-scs.co.uk", // sender address
      to, // list of receivers
      subject, // Subject line
      html, // plain text body
    });

    console.log("Email sent:", subject);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
