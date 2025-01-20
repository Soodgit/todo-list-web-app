const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middleware/errorHandler');


const app = express();
const PORT = process.env.PORT || 5000;
const API_URL = process.env.API_URL;

//public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./dist")));


// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(`/api/todos`, todoRoutes);

// Error Handler
app.use(errorHandler);

const helmet = require('helmet'); // Add this if not already installed: npm install helmet

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      fontSrc: ["'self'", "https:", "data:"], // Allow fonts from your domain, HTTPS, and inline `data:`
      styleSrc: ["'self'", "'unsafe-inline'", "https:"], // Allow styles
      scriptSrc: ["'self'", "'unsafe-inline'", "https:"], // Allow scripts
      imgSrc: ["'self'", "data:", "https:"], // Allow images
    },
  })
);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
