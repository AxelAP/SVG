const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    serverID: { type: String, require: true, unique: true },
    channelID: { type: String, require: true },
  },
  {
    versionKey: false,
  }
);

const model = mongoose.model("log", logSchema);

module.exports = model;
