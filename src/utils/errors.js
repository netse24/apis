/**
 * Base class for all custom application errors.
 * This allows us to use `instanceof AppError` to catch only the errors we've created.
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    // We only want to send back errors that we create ourselves
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Represents a 404 Not Found error.
 */
class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

/**
 * Represents a 400 Bad Request error (e.g., for validation failures).
 */
class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    super(message, 400);
  }
}

module.exports = {
  AppError,
  NotFoundError,
  BadRequestError,
};
