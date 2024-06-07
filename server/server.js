const express=require("express");
const bodyParser=require('body-parser');
const contactRoutes = require('./routes/contactRoutes');
const cors=require("cors");
const app=express();
app.use(bodyParser.json());
app.use(cors());
app.use('/contact', contactRoutes);
const sequelize = require("./config/mysql");
const startServer = async () => {
  try {
    await sequelize.authenticate(); 
    console.log(
      "Connection to the database has been established successfully."
    );
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();