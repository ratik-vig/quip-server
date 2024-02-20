const errorHandler = (err, req, res, next) => {
  
    const errors = err.errors
    const errorCode = err.statusCode || 500;

    res.status(errorCode).json({errorCode, errors});
    next();
  };
  
  module.exports = errorHandler;
  
  
  