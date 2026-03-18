import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from '../db/connection/dbConnect.js';
import { errorHandler } from '../middleware/errorHandler.js';
import { logger } from '../middleware/logger.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

await connectDB();

const corsOptions = {
  origin: '*', // Temporarily allow all for debugging
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.use('/api/tasks', taskRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Base URL: /api/tasks`);
});

export default app;
