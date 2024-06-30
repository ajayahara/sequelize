const express = require('express');
const { createTodo, updateTodo, deleteTodo, getTodos } = require('../controllers/todo.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', protect, createTodo);
router.put('/:id', protect, updateTodo);
router.delete('/:id', protect, deleteTodo);
router.get('/', protect, getTodos);

module.exports = router;
