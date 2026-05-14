import { ZodError } from "zod";

function getErrorStatus(error) {
  if (error instanceof ZodError) return 400;
  if (
    error.name === "JsonWebTokenError" ||
    error.name === "TokenExpiredError"
  ) {
    return 401;
  }

  const status = Number(error?.status ?? error?.statusCode);

  if (Number.isInteger(status) && status >= 400 && status <= 599) {
    return status;
  }

  return 500;
}

export function apiNotFoundHandler(req, res) {
  res.status(404).json({
    error: {
      message: `Route not found: ${req.method} ${req.originalUrl}`,
    },
  });
}

export function apiErrorHandler(error, req, res, next) {
  const status = getErrorStatus(error);
  const isServerError = status >= 500;
  const shouldExposeDetails = process.env.NODE_ENV !== "production";
  void next;
  // Determine the error message
  const message =
    error instanceof ZodError ? "Invalid request input"
    : !isServerError && error?.message ? error.message
    : "Internal server error";
  // Determine the error code
  let code = "SERVER_ERROR";

  if (status === 404) {
    code = "NOT_FOUND";
  } else if (error instanceof ZodError) {
    code = "VALIDATION_ERROR";
  } else if (status >= 400 && status < 500) {
    code = "BAD_REQUEST";
    //Build the standardized payload
    const payload = {
      error: {
        message,
        code,
      },
    };

    if (shouldExposeDetails && error?.message) {
      payload.error.details = error.message;
    }

    if (error instanceof ZodError) {
      payload.error.issues = error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));
    }

    if (shouldExposeDetails) {
      payload.error.path = req.originalUrl;
    }

    if (shouldExposeDetails && error?.stack) {
      payload.error.stack = error.stack;
    }

    res.status(status).json(payload);
  }
}
