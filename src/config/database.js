const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.MYSQL_DBNAME || 'devcode_nodejs',
  process.env.MYSQL_USER || 'root',
  process.env.MYSQL_PASSWORD || 'asd',
  {
    host: process.env.MYSQL_HOST || '172.17.0.1',
    dialect: 'mysql',
    logging: false,
  },
);

module.exports = sequelize;