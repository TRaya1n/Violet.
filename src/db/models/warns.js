const mongoose = require("mongoose");

// Create a new Schema
module.exports = mongoose.model(
  "warn",
  new mongoose.Schema({
    guild: { type: String, required: true },
    memberId: { type: String, required: true },
    reason: { type: String },
    executor: { type: String },
    time: { type: String },
  }),
);
