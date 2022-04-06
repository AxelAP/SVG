const mongoose = require("mongoose");

const wdSchema = new mongoose.Schema(
  {
    serverID: { type: String, require: true },
    word: { type: String, require: true },
    text: { type: String },
    image: { type: String },
  },
  {
    versionKey: false,
  }
);

const model = mongoose.model("word", wdSchema);

module.exports = model;
