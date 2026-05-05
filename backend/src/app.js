import express from 'express';
import cors from 'cors';
import helmet from 'helmet'; // For security headers
import morgan from 'morgan'; // Morgan is a logging middleware that logs HTTP requests and responses.

import unitRoutes from './routes/unitRoutes.js';
import jobTitleRoutes from './routes/jobTitleRoutes.js';

import { notFoundMiddleware, errorMiddleware } from './middlewares/index.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Employees Management System API is running',
  });
});

app.use('/api/v1/units', unitRoutes);
app.use('/api/v1/job-titles', jobTitleRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
