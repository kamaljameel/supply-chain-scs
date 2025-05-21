const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const signuproutes = require("./routers/signup");
const loginroutes = require("./routers/login");
const contactRoutes = require("./routers/contact");
const sequelize = require("./server/sequelizeConfig");
// const productRouter = require("./routers/product");
const forgotpassword = require("./routers/forgot-password");
const resetpassword = require("./routers/reset-password");
const verifyemail = require("./routers/verify-email");
const businessInquiryRoutes = require("./routers/businessInquiryRoutes");
const productRoutes = require("./routers/products");
const inquiryRoutes = require("./routers/inquiry");
const profileRoutes = require("./routers/userRoutes");
const businessRoutes = require("./routers/businessRouter");
const emailRoutes = require("./routers/emailRoutes");
const pdfRoutes = require("./routers/pdfRoutes");
const portRoutes = require("./routers/portOfLoading");
const portDischargeRoutes = require("./routers/portOfDischarge");
const paymentTermsRoutes = require("./routers/paymentTerms");
const paymentMethodRoutes = require("./routers/paymentMethod");
const varianceTermsRoutes = require("./routers/varianceTerms");
const shippingTermsRoutes = require("./routers/shippingTerms");
const shippingMethodRoutes = require("./routers/shippingMethod");
const path = require("path");
const app = express();
require("dotenv").config();

process.setUncaughtExceptionCaptureCallback((err) => {
  console.error("UncaughtExceptionCapture: ", err);
});

// Middleware
app.use(express.json());

// CORS Middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

// Test Database Connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

// Mount routes
// app.use("/api", productRouter);
app.use("/api/contact", contactRoutes);
app.use("/api/signup", signuproutes);
app.use("/api/login", loginroutes);
app.use("/api/forgot-password", forgotpassword);
app.use("/api/reset-password", resetpassword);
app.use("/api/verify-email", verifyemail);
app.use("/api/products", productRoutes);

app.use("/api/userRoutes", profileRoutes);
app.use("/api/business", businessRoutes);
app.use("/api", emailRoutes);
app.use("/api/pdfs", pdfRoutes);
app.use("/api/portOfLoading", portRoutes);
app.use("/api/portOfDischarge", portDischargeRoutes);
app.use("/api/paymentTerms", paymentTermsRoutes);
app.use("/api/paymentMethod", paymentMethodRoutes);
app.use("/api/varianceTerms", varianceTermsRoutes);
app.use("/api/shippingTerms", shippingTermsRoutes);
app.use("/api/shippingMethod", shippingMethodRoutes);
app.use("/api/inquiry", inquiryRoutes);
// busness inquiry
app.use("/api/business-inquiries", businessInquiryRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
