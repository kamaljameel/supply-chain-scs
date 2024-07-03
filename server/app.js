const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routers/routes");
const signuproutes = require("./routers/signup");
const loginroutes = require("./routers/login");
const contactRoutes = require("./routers/contact");
const sequelize = require("./server/sequelizeConfig");
const app = express();
require("dotenv").config();

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
app.use("/api", routes);
app.use("/api", contactRoutes);
app.use("/sign-up", signuproutes);
app.use("/login", loginroutes);
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
