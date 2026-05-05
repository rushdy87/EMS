const handleSuccess = (
  res,
  data = null,
  message = 'Success',
  statusCode = 200,
) => {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data,
  });
};

export default handleSuccess;
