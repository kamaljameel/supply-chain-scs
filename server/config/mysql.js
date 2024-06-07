const Sequelize = require('sequelize');
const sequelize = new Sequelize('supply-chain', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;