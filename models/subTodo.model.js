const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Subtodo = sequelize.define('Subtodo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Subtodo;
