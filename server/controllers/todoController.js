const Todo = require('../models/Todo');

// Get all todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: 1 }); // Change -1 to 1 for ascending order
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Create new todo
const createTodo = async (req, res) => {
  try {
    const { text } = req.body;
    const newTodo = new Todo({
      text,
      isComplete: false
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update todo
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, isComplete } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { text, isComplete },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete todo
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
};
