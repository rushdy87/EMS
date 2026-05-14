import { ZodError } from 'zod';
import AppError from '../utils/AppError.js';

const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const message = err.issues.map((issue) => issue.message).join(', ');
        return next(new AppError(message, 400));
      }

      next(err);
    }
  };
};

export default validateRequest;
