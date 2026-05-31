const errorHandler = (err, req, res, next) => {
  // Log details to console in red color for developers
  console.error(`\x1b[31m[Error Handler Log]:\x1b[0m`, err);

  let errorResponse = {
    success: false,
    error: err.message || 'Internal Server Error'
  };

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // 1. Mongoose Bad ObjectID (CastError)
  if (err.name === 'CastError') {
    statusCode = 404;
    errorResponse.error = `Resource not found with id of ${err.value}`;
  }

  // 2. Mongoose Duplicate Key (e.g. Unique Name)
  if (err.code === 11000) {
    statusCode = 400;
    const duplicatedField = Object.keys(err.keyValue)[0];
    errorResponse.error = `A product with this ${duplicatedField} already exists. Please choose a unique value.`;
  }

  // 3. Mongoose Validation Errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    const errors = Object.values(err.errors).map(val => val.message);
    errorResponse.error = 'Validation failed';
    errorResponse.details = errors;
  }

  res.status(statusCode).json(errorResponse);
};

export default errorHandler;
