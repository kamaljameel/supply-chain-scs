// server/controllers/contactController.js
const nodemailer = require("nodemailer");
const Contact = require("../models/Contact");
const crypto = require("crypto");
const handleContactForm = async (req, res) => {
  const { name, email, subject, textContent } = req.body;
  // Generate a random password
  const generatedPassword = crypto.randomBytes(8).toString("hex");

  // Save form data to the database
  try {
    await Contact.create({ name, email, subject, message: textContent });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to save to database.", error: error.message });
  }

  // Configure the email transporter
  const transporter = nodemailer.createTransport({
    host: "i-scs.co.uk",
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: "info@i-scs.co.uk",
      pass: "LahoreSupplyChain@123",
    },
  });

  try {
    const info = await transporter.sendMail({
      from: "info@i-scs.co.uk", // sender address
      to: ` ${email}`,
      subject: subject, // Subject line
      text: `Subject: ${subject}\nName: ${name}\nEmail: ${email}\nMessage: ${textContent}`,
    });

    console.log("Message sent: %s", JSON.stringify(info));

    // Send system-generated password to the user's email
    const passwordMailOptions = {
      from: "info@i-scs.co.uk",
      to: email,
      subject: "System Generated Password",
      text: `Dear ${name},\n\nYour system-generated password is: ${generatedPassword}\n\nPlease keep it safe.\n\nBest regards,\nThe Team ISCS`,
    };

    const passwordInfo = await transporter.sendMail(passwordMailOptions);
    console.log(
      "System-generated password sent to user:",
      JSON.stringify(passwordInfo)
    );

    res
      .status(200)
      .json({ message: "Email sent and data saved successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to send email.", error: error.message });
  }
};

module.exports = { handleContactForm };
