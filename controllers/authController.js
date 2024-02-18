const asyncHandler = require("express-async-handler");
const { generateAccessToken } = require("../utils/jwtHelpers");
const Log = require("../models/logSchema");
const logHelper = require("../utils/logHelper");
const {
  constants: { INTERNAL_SERVER_ERROR },
} = require("../constants");

const validationAuthRequest = require("../utils/validationAuthReq");

// * Plain registration route for using JWT [For task purpose]
const registration = asyncHandler(async (req, res) => {
  const logData = logHelper(req);
  try {
    const authorizePrivateKey = req.body?.authorizePrivateKey;

    const validation = validationAuthRequest(authorizePrivateKey);

    if (!validation.isValid) {
      return res
        .status(validation.status)
        .json({ message: validation.message });
    }

    const accessToken = generateAccessToken(authorizePrivateKey);

    Log.create({
      req: logData,
      res: { error: null, answer: accessToken },
      isError: false,
    });

    return res.status(201).json({ message: "ok", accessToken });
  } catch (error) {
    console.error(error);

    Log.create({
      req: logData,
      res: { error, answer: null },
      isError: true,
    });

    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error", error });
  }
});

module.exports = {
  registration,
};
