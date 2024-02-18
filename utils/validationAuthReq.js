const {
  constants: { VALIDATION_ERROR, UNAUTHORIZED_ERROR },
} = require("../constants");

function validationAuthRequest(authorizePrivateKey) {
  if (!authorizePrivateKey || typeof authorizePrivateKey !== "string") {
    return {
      status: VALIDATION_ERROR,
      message: "Use your authorizePrivateKey",
      isValid: false,
    };
  }

  if (process.env.AUTH_PRIVATE_KEY !== authorizePrivateKey) {
    return {
      status: UNAUTHORIZED_ERROR,
      message: "Invalid or expired private key",
      isValid: false,
    };
  }

  return {
    status: 201,
    message: "ok",
    isValid: true,
  };
}

module.exports = validationAuthRequest;
