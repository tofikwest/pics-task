const asyncHandler = require("express-async-handler");
const Log = require("../models/logSchema");
const {
  constants: { INTERNAL_SERVER_ERROR, NOT_FOUND_ERROR },
} = require("../constants");

const getAllLogs = asyncHandler(async (req, res) => {
  try {
    const allLogs = await Log.find({}).sort({ createdAt: -1 });

    return res.status(200).json({ message: "ok", allLogs });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: "error", error });
  }
});

const getOneLog = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const findLog = await Log.findOne({ _id: id });

    if (!findLog) {
      return res
        .status(NOT_FOUND_ERROR)
        .json({ message: `Not found this id: ${id}` });
    }

    return res.status(200).json({ message: "ok", log: findLog });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: "error", error });
  }
});

module.exports = {
  getAllLogs,
  getOneLog,
};
