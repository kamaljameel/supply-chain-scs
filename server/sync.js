// sync.js
const sequelize = require("sequelize");

const User = require("./models/User");

async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
}

syncDatabase();
