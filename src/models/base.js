const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  config.database.database,
  config.database.username,
  config.database.password,
  {
    host: config.database.host,
    dialect: config.database.dialect,
    port: config.database.port,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
);

module.exports = {
  Sequelize,
  sequelize
};