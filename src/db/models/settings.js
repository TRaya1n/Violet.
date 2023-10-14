const mongoose = require("mongoose");

// Create a new Schema
module.exports = mongoose.model(
  "setting",
  new mongoose.Schema({
    guild: { type: String, required: true },

    config: {
      message: { type: String, default: null, allowNull: true },
      channel: { type: String, default: null, allowNull: true },
      member: { type: String, default: null, allowNull: true },
    },

    suggestion: {
      channel: { type: String, default: null, allowNull: true },
      _ID: { type: String, defualt: null, allowNull: true },
    },
  })
);
