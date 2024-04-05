const mongoose = require("mongoose");

module.exports = mongoose.model(
  "log",
  new mongoose.Schema({
    guildId: String,

    channel: {
      status: Boolean,
      id: String,
    },

    message: {
      status: Boolean,
      id: String
    }
  }),
);
