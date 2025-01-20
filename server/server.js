const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middleware/errorHandler');
const path = require('path'); // Add this line

const app = express();
const PORT = process.env.PORT || 5000;
const API_URL = process.env.API_URL;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// CSP Headers - Modified to be more permissive
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "font-src 'self' data: *; " +
    "style-src 'self' 'unsafe-inline'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "img-src 'self' data: https:; " +
    "connect-src 'self' *;"
  );
  next();
});

// Routes
app.use(`/api/todos`, todoRoutes);

// Serve your frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});