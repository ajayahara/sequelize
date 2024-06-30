const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Subtodo = require('./Subtodo');

const Todo = sequelize.define('Todo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Todo.afterDestroy(async (todo, options) => {
  await Subtodo.destroy({ where: { TodoId: todo.id } });
});

module.exports = Todo;
