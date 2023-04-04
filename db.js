const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('your_database_name', 'gress2123', 'password', {
  host: 'cs341.mysql.database.azure.com',
  dialect: 'mysql',
  dialectOptions: {
        ssl: {
        require: true,
        // Do not reject unauthorized certificates, Azure does not provide a CA certificate
        rejectUnauthorized: false
        }
    }
});

module.exports = sequelize;
