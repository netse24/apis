// const errorHandler = (err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: "Something went wrong!" });
// };

// module.exports = errorHandler;

const { AppError } = require("../utils/errors");

const errorHandler = (err, req, res, next) => {
  // Log the error for the developer
  console.error(err);

  // Default to a 500 error if it's not an AppError we created
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";

  // If the error is an operational error we created, trust its message and status
  if (err.isOperational) {
    statusCode = err.statusCode;
    message = err.message;
  }
  // For other types of errors (e.g., database errors, programming errors),
  // we don't want to leak implementation details in production.
  else if (process.env.NODE_ENV === "production") {
    // Here you could add specific checks for known non-operational errors
    // For example, a duplicate key error from the database could be a 409 Conflict.

    // For now, we'll keep it simple and generic for unknown errors
    message = "An unexpected error occurred on the server.";
  }

  const response = {
    status: "error",
    message,
    statusCode: statusCode,
  };

  // In development mode, add the stack trace for easier debugging
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
