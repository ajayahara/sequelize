const { Todo, Subtodo } = require('../models');

exports.createTodo = async (req, res) => {
  const { title } = req.body;
  const userId = req.user.id;

  try {
    const newTodo = await Todo.create({ title, UserId: userId });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo", error });
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.title = title;
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await todo.destroy();
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
};

exports.getTodos = async (req, res) => {
  const userId = req.user.id;

  try {
    const todos = await Todo.findAll({ where: { UserId: userId }, include: [Subtodo] });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
};
