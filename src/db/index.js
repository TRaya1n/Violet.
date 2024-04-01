const mongoose = require("mongoose");
const chalk = require("chalk");
const { Logger } = require("../utils/utility.js");

module.exports = {
  connect: () => {
    const mongo = mongoose.connect(process.env.DATABASE);

    mongoose.connection.on("connected", () => {
      Logger.prototype.info(`MongoDB connected.`);
    });
  },

  models: {
    log: require("./models/log.js"),
  },
};
