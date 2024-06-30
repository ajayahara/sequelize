const { Subtodo, Todo } = require('../models');

exports.createSubtodo = async (req, res) => {
  const { title, todoId } = req.body;

  try {
    const todo = await Todo.findByPk(todoId);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const newSubtodo = await Subtodo.create({ title, TodoId: todoId });
    res.status(201).json(newSubtodo);
  } catch (error) {
    res.status(500).json({ message: "Error creating subtodo", error });
  }
};

exports.updateSubtodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const subtodo = await Subtodo.findByPk(id);

    if (!subtodo) {
      return res.status(404).json({ message: "Subtodo not found" });
    }

    subtodo.title = title;
    subtodo.completed = completed;
    await subtodo.save();

    // Check if all subtodos of the parent todo are completed
    const todo = await Todo.findByPk(subtodo.TodoId, { include: [Subtodo] });
    const allCompleted = todo.Subtodos.every(st => st.completed);

    todo.completed = allCompleted;
    await todo.save();

    res.status(200).json(subtodo);
  } catch (error) {
    res.status(500).json({ message: "Error updating subtodo", error });
  }
};

exports.deleteSubtodo = async (req, res) => {
  const { id } = req.params;

  try {
    const subtodo = await Subtodo.findByPk(id);

    if (!subtodo) {
      return res.status(404).json({ message: "Subtodo not found" });
    }

    await subtodo.destroy();
    res.status(200).json({ message: "Subtodo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting subtodo", error });
  }
};
