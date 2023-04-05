const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const Program = require('./Program');
const User = require('./User');

const Registration = sequelize.define('Registration', {
  registrationID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  programID: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Program,
      key: 'programID',
    },
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'userID',
    },
  },
}, {
  tableName: 'REGISTRATION',
  timestamps: false,
});

module.exports = Registration;
