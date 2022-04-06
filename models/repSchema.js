const mongoose = require("mongoose");

const repSchema = new mongoose.Schema(
  {
    botID: { type: String, require: true, unique: true },
    reply: { type: Array, default: [] },
  },
  {
    versionKey: false,
  }
);

const model = mongoose.model("reply", repSchema);

module.exports = model;
