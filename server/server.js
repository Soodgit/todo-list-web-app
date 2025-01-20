import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db';
import todoRoutes from './routes/todoRoutes';
import errorHandler from './middleware/errorHandler';

const app = express();

connectDB()
  .then(() => {
    app
      .use(cors())
      .use(express.json())
      .use('/api/todos', todoRoutes)
      .use((req, res) => res.status(404).send('Route Not Found'))
      .use(errorHandler)
      .listen(process.env.PORT || 5000, () => 
        console.log(`Server running on port ${process.env.PORT || 5000}`))
      .on('error', err => {
        console.error('Server error:', err);
        process.exit(1);
      });
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

process.on('uncaughtException', err => console.error('Uncaught Exception:', err) || process.exit(1))
  .on('unhandledRejection', err => console.error('Unhandled Rejection:', err) || process.exit(1));
