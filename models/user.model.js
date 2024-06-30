const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  hooks: {
    beforeDestroy: async (user, options) => {
      await user.getTodos().then(todos => {
        todos.forEach(todo => {
          todo.destroy();
        });
      });
    }
  }
});

module.exports = User;
