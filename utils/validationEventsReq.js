const { VALIDATION_ERROR } = require("../constants");

function validatePropertyEvent(body = {}) {
  const errors = [];

  if (!body.payload) {
    errors.push({ field: "payload", message: "Payload is required" });
  } else if (typeof body.payload !== "object") {
    errors.push({ field: "payload", message: "Payload must be an object" });
  }

  if (!body.possibleDestinations || !Array.isArray(body.possibleDestinations)) {
    errors.push({
      field: "possibleDestinations",
      message: "Invalid possibleDestinations format",
    });
  } else {
    for (const destination of body.possibleDestinations) {
      if (typeof destination !== "object") {
        errors.push({
          field: "possibleDestinations",
          message: "Each element must be an object",
        });
        break;
      }

      Object.entries(destination).forEach(([key, value]) => {
        if (typeof value !== "boolean") {
          errors.push({
            field: `possibleDestinations.${key}`,
            message: `Value must be a boolean`,
          });
        }
      });
    }
  }

  if (body.strategy) {
    if (typeof body.strategy !== "string") {
      errors.push({ field: "strategy", message: "Invalid strategy format" });
    } else if (
      !["ALL", "ANY"].includes(body.strategy) &&
      !(new Function(body.strategy) instanceof Function) &&
      !validateStrategyFunction(body.strategy)
    ) {
      errors.push({ field: "strategy", message: "Invalid strategy value" });
    }
  }

  if (errors.length > 0) {
    return {
      message: "Validation failed",
      errors,
      status: VALIDATION_ERROR,
      res: false,
    };
  }

  return {
    res: true,
  };
}

function validateStrategyFunction(strategyFn) {
  if (!(strategyFn instanceof Function)) {
    return false;
  }

  try {
    const result = strategyFn([
      { destination1: true },
      { destination2: false },
    ]);
    if (typeof result !== "boolean") {
      return false;
    }
  } catch (error) {
    return false;
  }

  return true;
}

module.exports = {
  validatePropertyEvent,
  validateStrategyFunction,
};
