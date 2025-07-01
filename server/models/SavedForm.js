// models/SavedForm.js
const { DataTypes } = require("sequelize");
const sequelize = require("../server/sequelizeConfig");
const SavedForm = sequelize.define(
  "SavedForm",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    inquiry_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    business_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "saved_forms",
    timestamps: false, // Disable Sequelize's automatic timestamps if not using updatedAt
    underscored: true, // Matches snake_case column names like `created_at`
  }
);
module.exports = SavedForm;
