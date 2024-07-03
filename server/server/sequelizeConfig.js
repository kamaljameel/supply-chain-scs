const Sequelize = require("sequelize");

// Determine environment ('development', 'production', etc.)
const environment = process.env.NODE_ENV;

// Load the appropriate configuration file based on environment
let config;
if (environment === "production") {
  config = require("./config/config.live.js");
} else {
  config = require("./config/config.local.js");
}

// Create Sequelize instance using selected configuration
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
