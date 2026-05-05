import express from 'express';
import cors from 'cors';
import helmet from 'helmet'; // For security headers
import morgan from 'morgan'; // Morgan is a logging middleware that logs HTTP requests and responses.

import unitRoutes from './routes/unitRoutes.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/units', unitRoutes);

app.all('/{*any}', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Route ${req.originalUrl} not found`,
  });
});

export default app;
