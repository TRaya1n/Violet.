// User settings these settings only apply to one user and not multiple
// For example embed color

const mongoose = require("mongoose");

module.exports = new mongoose.model(
  "users",
  new mongoose.Schema({
    user: { type: String, required: true }, // User = id of the user

    config: {
      color: { type: String, defualt: null, allowNull: true },
    },
  })
);
