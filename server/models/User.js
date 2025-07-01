// // models/User.js
// const { DataTypes } = require("sequelize");
// const sequelize = require("../server/sequelizeConfig");

// const User = sequelize.define(
//   "User",
//   {
//     FirstName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     LastName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     Email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: true,
//       },
//     },
//     MobileNumber: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     Password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     role: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     verified: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = User;

const { DataTypes } = require("sequelize");
const sequelize = require("../server/sequelizeConfig");

const User = sequelize.define(
  "User",
  {
    FirstName: { type: DataTypes.STRING, allowNull: false },
    LastName: { type: DataTypes.STRING, allowNull: false },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    MobileNumber: { type: DataTypes.STRING, allowNull: false },
    Password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
    verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    Address: { type: DataTypes.STRING },
    City: { type: DataTypes.STRING },
    State: { type: DataTypes.STRING },
    Country: { type: DataTypes.STRING },
    ZipCode: { type: DataTypes.STRING },
    companyName: { type: DataTypes.STRING },
    companyAddress: { type: DataTypes.STRING },
    companyCityStateZip: { type: DataTypes.STRING },
    companyPostCode: { type: DataTypes.STRING },
    ProfilePicture: { type: DataTypes.STRING },
  },
  { timestamps: true }
);

module.exports = User;
