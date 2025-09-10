class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  // Default values if not set
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // ------------------- Specific Error Handling -------------------

  // Mongoose CastError (Invalid ObjectId)
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((value) => value.message)
      .join(", ");
    err = new ErrorHandler(message, 400);
  }

  // JWT Invalid Token
  if (err.name === "JsonWebTokenError") {
    const message = "Json Web Token is invalid. Try again!";
    err = new ErrorHandler(message, 400);
  }

  // JWT Expired Token
  if (err.name === "TokenExpiredError") {
    const message = "Json Web Token has expired. Try again!";
    err = new ErrorHandler(message, 400);
  }

  // ------------------- Send Response -------------------
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack, // show stack trace only in dev
  });
};

export default ErrorHandler;
