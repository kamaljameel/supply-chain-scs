const { DataTypes } = require("sequelize");
const sequelize = require("../server/sequelizeConfig");
const Product = sequelize.define("Product", {
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hsCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  unitOfMeasurement: {
    type: DataTypes.ENUM("kg", "numbers", "litters", "pics"),
    allowNull: false,
  },
  size: {
    type: DataTypes.ENUM("XS", "S", "M", "L", "XL", "XXL", "XXXL"),
    allowNull: false,
  },
  length: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  width: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  height: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  productCategoryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  netweight: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  grossweight: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});

module.exports = Product;
