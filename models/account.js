const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Account = sequelize.define('Account', {
  accountID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  tableName: 'ACCOUNT',
  timestamps: false,
});

module.exports = Account;
