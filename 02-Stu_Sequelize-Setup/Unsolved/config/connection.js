const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME, // 'ecommerce_db',
  process.env.DB_USER,
  process.env.DB_PASSWORD, // must be written the exact same way as in the .env file
  {
    host: 'localhost',
    dialect: 'postgres'
  }
);

module.exports = sequelize;
