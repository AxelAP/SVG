const mongoose = require("mongoose");

const delSchema = new mongoose.Schema(
  {
    serverID: { type: String, require: true, unique: true },
    command: { type: String, require: true },
    delete: { type: Array, default: [] },
  },
  {
    versionKey: false,
  }
);

const model = mongoose.model("deletes", delSchema);

module.exports = model;
