const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: "i-scs.co.uk",
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: "info@i-scs.co.uk",
    pass: "LahoreSupply@123",
  },
});

// Function to create a new user
const createUser = async ({
  FirstName,
  LastName,
  Email,
  MobileNumber,
  Password,
  role,
}) => {
  try {
    // Check if the user with the provided email already exists
    const existingUser = await User.findOne({ where: { Email } });
    if (existingUser) {
      throw new Error(
        "Email already exists. Please check your email to verify for login."
      );
    }
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Create a new user record in the database
    const user = await User.create({
      FirstName,
      LastName,
      Email,
      MobileNumber,
      Password: hashedPassword,
      role,
      verified: false, // Assuming user is not verified initially
    });

    // Generate an email verification token
    const emailToken = jwt.sign(
      { email: user.Email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    // Construct the verification URL
    const verificationURL = `https://i-scs.co.uk/verifyemail?token=${emailToken}`;

    // Send verification email
    await transporter.sendMail({
      from: "info@i-scs.co.uk",
      to: user.Email,
      subject: "Verify your email",
      html: `<p>Click <a href="${verificationURL}">here</a> to verify your email.</p>`,
    });

    return user; // Return the created user object
  } catch (error) {
    throw error; // Forward any errors to the caller
  }
};

// Function to handle forgot password request
const forgotPassword = async (email) => {
  try {
    // Find user by email
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      throw new Error("User not found");
    }

    // Generate a password reset token
    const resetToken = jwt.sign(
      { email: user.Email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Construct the reset password URL
    const resetURL = `https://i-scs.co.uk/resetpassword?token=${resetToken}`;

    // Send password reset email
    await transporter.sendMail({
      from: "info@i-scs.co.uk",
      to: user.Email,
      subject: "Reset your password",
      html: `<p>Click <a href="${resetURL}">here</a> to reset your password.</p>`,
    });
  } catch (error) {
    throw error; // Forward any errors to the caller
  }
};

// Function to reset user password
const resetPassword = async (token, newPassword) => {
  try {
    // Verify the reset token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find user by email in the decoded token
    const user = await User.findOne({ where: { email: decoded.email } });

    if (!user) {
      throw new Error("Invalid token or user not found");
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();
  } catch (error) {
    throw error; // Forward any errors to the caller
  }
};

// Update user profile
// const updateUserProfile = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const {
//       FirstName,
//       LastName,
//       Address,
//       City,
//       State,
//       Country,
//       ZipCode,
//       ProfilePicture,
//       companyName,
//       companyAddress,
//       companyCityStateZip,
//       companyPostCode,
//     } = req.body;

//     const user = await User.findByPk(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     await user.update({
//       FirstName,
//       LastName,
//       Address,
//       City,
//       State,
//       Country,
//       ZipCode,
//       companyName,
//       companyAddress,
//       companyCityStateZip,
//       companyPostCode,
//       ProfilePicture,
//     });

//     res.status(200).json({ message: "Profile updated successfully", user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error updating profile", error });
//   }
// };

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      // If user not found and file was uploaded, clean it up
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error("Error deleting uploaded file:", err);
        });
      }
      return res.status(404).json({ message: "User not found" });
    }

    const {
      FirstName,
      LastName,
      Address,
      City,
      State,
      Country,
      ZipCode,
      companyName,
      companyAddress,
      companyCityStateZip,
      companyPostCode,
    } = req.body;

    // Prepare fields to update (only update fields that are provided)
    const updatedFields = {};

    if (FirstName !== undefined && FirstName !== "")
      updatedFields.FirstName = FirstName;
    if (LastName !== undefined && LastName !== "")
      updatedFields.LastName = LastName;
    if (Address !== undefined) updatedFields.Address = Address;
    if (City !== undefined) updatedFields.City = City;
    if (State !== undefined) updatedFields.State = State;
    if (Country !== undefined) updatedFields.Country = Country;
    if (ZipCode !== undefined) updatedFields.ZipCode = ZipCode;
    if (companyName !== undefined) updatedFields.companyName = companyName;
    if (companyAddress !== undefined)
      updatedFields.companyAddress = companyAddress;
    if (companyCityStateZip !== undefined)
      updatedFields.companyCityStateZip = companyCityStateZip;
    if (companyPostCode !== undefined)
      updatedFields.companyPostCode = companyPostCode;

    // Handle profile picture upload
    if (req.file) {
      // Delete old profile picture if it exists
      if (user.ProfilePicture) {
        const oldImagePath = path.join(
          __dirname,
          "../uploads",
          user.ProfilePicture
        );
        fs.unlink(oldImagePath, (err) => {
          if (err && err.code !== "ENOENT") {
            console.error("Error deleting old profile picture:", err);
          }
        });
      }
      updatedFields.ProfilePicture = req.file.filename;
    }

    // Only update if there are fields to update
    if (Object.keys(updatedFields).length > 0) {
      await user.update(updatedFields);
    }

    // Fetch updated user
    const updatedUser = await User.findByPk(userId);

    // Return updated user without password
    const { Password, ...userWithoutPassword } = updatedUser.toJSON();

    res.status(200).json({
      message: "Profile updated successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error updating profile:", error);

    // Clean up uploaded file in case of error
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err)
          console.error("Error deleting uploaded file after error:", err);
      });
    }

    res.status(500).json({
      message: "Error updating profile",
      error: error.message,
    });
  }
};

const getUserProfile = async (userId) => {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  forgotPassword,
  resetPassword,
  updateUserProfile,
  getUserProfile,
};
