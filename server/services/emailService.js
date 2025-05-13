const nodemailer = require("nodemailer");

// Create a transporter
const transporter = nodemailer.createTransport({
  host: "i-scs.co.uk",
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: "info@i-scs.co.uk",
    pass: "LahoreSupply@123",
  },
});
// Looking to send emails in production? Check out our Email API/SMTP product!
// var transporter = nodemailer.createTransport({
//   host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "8e328a1d70450f",
//     pass: "ae7055397aeff3",
//   },
// });
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
