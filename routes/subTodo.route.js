const express = require('express');
const { createSubtodo, updateSubtodo, deleteSubtodo } = require('../controllers/subTodo.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', protect, createSubtodo);
router.put('/:id', protect, updateSubtodo);
router.delete('/:id', protect, deleteSubtodo);

module.exports = router;
