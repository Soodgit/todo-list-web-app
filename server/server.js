const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;
const API_URL = process.env.API_URL;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Add CSP headers middleware
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "font-src 'self' data: https://todo-list-web-app-3odh.onrender.com; default-src 'self';"
  );
  next();
});

// Routes
app.use(`/api/todos`, todoRoutes);

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});