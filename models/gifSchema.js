const mongoose = require("mongoose");

const gifSchema = new mongoose.Schema(
  {
    messageID: { type: String, require: true, unique: true },
    userID: { type: String, require: true },
    query: { type: String },
    gifs: { type: Array, default: [] },
    descriptions: { type: Array, default: [] },
    actual: { type: Number },
    siguiente: { type: Number },
    anterior: { type: Number },
  },
  {
    versionKey: false,
  }
);

const model = mongoose.model("gif", gifSchema);

module.exports = model;
