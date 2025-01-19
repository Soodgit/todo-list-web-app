const validateTodoInput = (req, res, next) => {
    const { text } = req.body;
  
    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Todo text is required' });
    }
  
    req.body.text = text.trim();
    next();
  };
  
  module.exports = {
    validateTodoInput
  };
  