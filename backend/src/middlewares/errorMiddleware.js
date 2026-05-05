import {
  UniqueConstraintError,
  ValidationError,
  DatabaseError,
} from 'sequelize';

const sendErrorDev = (err, res) => {
  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong',
  });
};

const handleSequelizeUniqueError = (err) => {
  const fields = Object.keys(err.fields || {}).join(', ');
  err.statusCode = 400;
  err.status = 'fail';
  err.isOperational = true;
  err.message = fields
    ? `Duplicate value for field: ${fields}`
    : 'Duplicate field value';
  return err;
};

const handleSequelizeValidationError = (err) => {
  err.statusCode = 400;
  err.status = 'fail';
  err.isOperational = true;
  err.message = err.errors?.map((e) => e.message).join(', ') || err.message;
  return err;
};

const handleSequelizeDatabaseError = (err) => {
  err.statusCode = 500;
  err.status = 'error';
  err.isOperational = true;
  err.message = 'Database error';
  return err;
};

const errorMiddleware = (err, req, res, next) => {
  let error = err;

  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if (error instanceof UniqueConstraintError) {
    error = handleSequelizeUniqueError(error);
  }

  if (error instanceof ValidationError) {
    error = handleSequelizeValidationError(error);
  }

  if (error instanceof DatabaseError) {
    error = handleSequelizeDatabaseError(error);
  }

  if (process.env.NODE_ENV === 'development') {
    return sendErrorDev(error, res);
  }

  return sendErrorProd(error, res);
};

export default errorMiddleware;
