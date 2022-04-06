const mongoose = require("mongoose");

const prSchema = new mongoose.Schema(
  {
    botID: { type: String, require: true, unique: true },
    presence: { type: Array, default: [] },
  },
  {
    versionKey: false,
  }
);

const model = mongoose.model("presence", prSchema);

module.exports = model;
