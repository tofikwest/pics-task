const asyncHandler = require("express-async-handler");
const Log = require("../models/logSchema");
const {
  constants: { VALIDATION_ERROR, INTERNAL_SERVER_ERROR },
} = require("../constants");
const { validatePropertyEvent } = require("../utils/validationEventsReq");
const processEvent = require("../utils/processEvent");
const logHelper = require("../utils/logHelper");

const postEvents = asyncHandler(async (req, res) => {
  const logData = logHelper(req);

  try {
    const body = req.body;
    const validationStage = validatePropertyEvent(body);

    if (validationStage.res === false) {
      Log.create({
        req: logData,
        res: { error: validationStage, answer: null },
        isError: true,
      });
      return res.status(VALIDATION_ERROR).json(validationStage);
    }
    const answer = processEvent(body);

    Log.create({
      req: logData,
      res: { answer, error: null },
      isError: false,
    });

    res.status(200).json({ answer, error: null });
  } catch (error) {
    console.error(error);

    Log.create({
      req: logData,
      res: { error, answer: null },
      isError: true,
    });

    res.status(INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
  }
});

module.exports = { postEvents };
