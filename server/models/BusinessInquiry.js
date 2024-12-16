const { DataTypes } = require("sequelize");
const sequelize = require("../server/sequelizeConfig");

const BusinessInquiry = sequelize.define(
  "BusinessInquiry",
  {
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PersonalEmail1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    PersonalMobile1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Remarks: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    InterestedInName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    EstimatedRevenue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    LeadSourceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "business_inquiries",
    timestamps: false, // This will create `createdAt` and `updatedAt` columns automatically
  }
);

module.exports = BusinessInquiry;
