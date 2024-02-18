const {
  constants: {
    NOT_FOUND_ERROR,
    VALIDATION_ERROR,
    UNAUTHORIZED_ERROR,
    INTERNAL_SERVER_ERROR,
    FORBIDDEN_ERROR,
  },
} = require("../constants");
const Log = require("../models/logSchema");
const logHelper = require("../utils/logHelper");

const errorHandler = (err, req, res, next) => {
  if (err) {
    const statusCode = res.statusCode ? res.statusCode : INTERNAL_SERVER_ERROR;

    console.error("\n", err);
    try {
      Log.create({
        req: logHelper(req),
        res: { error: err, answer: null },
        isError: true,
      });
    } catch (error) {
      console.error("\nERROR IN CATCH :: ERROR HANDLER\n", error);
    }

    switch (statusCode) {
      case VALIDATION_ERROR:
        res.status(VALIDATION_ERROR).json({
          title: "Validation Failed",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
      case NOT_FOUND_ERROR:
        res.status(NOT_FOUND_ERROR).json({
          title: "Not Found",
          message: err.message,
          stackTrace: err.stack,
        });
        break;

      case FORBIDDEN_ERROR:
        res.status(FORBIDDEN_ERROR).json({
          title: "FORBIDDEN",
          message: err.message,
          stackTrace: err.stack,
        });
        break;

      case UNAUTHORIZED_ERROR:
        res.status(UNAUTHORIZED_ERROR).json({
          title: "UNAUTHORIZED",
          message: err.message,
          stackTrace: err.stack,
        });
        break;

      case INTERNAL_SERVER_ERROR:
        res.status(INTERNAL_SERVER_ERROR).json({
          title: "INTERNAL SERVER",
          message: err.message,
          stackTrace: err.stack,
        });
        break;

      default:
        res.status(INTERNAL_SERVER_ERROR).json({
          title: "INTERNAL SERVER",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
    }
  }

  next();
};

module.exports = errorHandler;
