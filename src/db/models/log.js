const mongoose = require("mongoose");

module.exports = mongoose.model(
  "log",
  new mongoose.Schema({
    Id: String,
    channel: { type: String, allowNull: true, default: true },
  }),
);
