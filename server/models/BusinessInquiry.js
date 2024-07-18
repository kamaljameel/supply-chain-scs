const { DataTypes } = require("sequelize");
const sequelize = require("../server/sequelizeConfig");

const BusinessInquiry = sequelize.define(
  "BusinessInquiry",
  {
    BusinessName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    OfficialEmail: {
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
    InquiryLine: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    InterestedInName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "business_inquiries",
    timestamps: true,
  }
);

module.exports = BusinessInquiry;
