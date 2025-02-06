const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: "i-scs.co.uk",
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: "info@i-scs.co.uk",
    pass: "LahoreSupplyChain@123",
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
const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { LastName, Address, City, State, Country, ZipCode, ProfilePicture } =
      req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.update({
      LastName,
      Address,
      City,
      State,
      Country,
      ZipCode,
      ProfilePicture,
    });

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating profile", error });
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
