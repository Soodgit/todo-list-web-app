const express = require('express');
const router = express.Router();
const { 
  getTodos, 
  createTodo, 
  updateTodo, 
  deleteTodo 
} = require('../controllers/todoController');
const { validateTodoInput } = require('../middleware/validateRequest');

router.get('/', getTodos);
router.post('/', validateTodoInput, createTodo);
router.put('/:id', validateTodoInput, updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
