const errorHandler = (err, req, res, next) => {
    const errors = err.errors || [{msg: err.message}] || [{msg: "Something went wrong"}]
    const errorCode = err.statusCode || 500;

    res.status(errorCode).json({errorCode, errors});
    next();
  };
  
  module.exports = errorHandler;
  
  
  