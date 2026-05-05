import { validate as isValidUUID } from 'uuid';
import AppError from '../utils/AppError.js';

const validateIdParam = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];

    if (!isValidUUID(id)) {
      return next(new AppError(`Invalid ${paramName}`, 400));
    }

    next();
  };
};

export default validateIdParam;
