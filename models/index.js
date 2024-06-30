const User = require("./user.model");
const Todo = require("./todo.model");
const Subtodo = require("./subTodo.model");

User.hasMany(Todo, { onDelete: "CASCADE" });
Todo.belongsTo(User);

Todo.hasMany(Subtodo, { onDelete: "CASCADE" });
Subtodo.belongsTo(Todo);

module.exports = { User, Todo, Subtodo };
