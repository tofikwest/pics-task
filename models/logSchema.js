const mongoose = require("mongoose");

const logSchema = mongoose.Schema(
  {
    req: {
      type: Object,
      required: true,
    },
    res: {
      type: Object,
      required: true,
    },
    isError: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        key: { createdAt: -1 },
        unique: true,
      },
    ],
  }
);

module.exports = mongoose.model("Log", logSchema);
