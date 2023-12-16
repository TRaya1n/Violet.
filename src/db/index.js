const mongoose = require("mongoose");
const chalk = require("chalk");

module.exports = {
  connect: () => {
    const mongo = mongoose.connect(process.env.DATABASE);
    mongoose.connection.on("connecting", () => {
      console.log(
        chalk.red("<system:mongo>"),
        chalk.blue("Connecting to database"),
      );
    });

    mongoose.connection.on("connected", () => {
      console.log(
        chalk.red("<system:mongo>"),
        chalk.blue("Connected to database"),
      );
    });
  },

  models: {
    settings: require("./models/settings.js"),
    warn: require("./models/warns.js"),
    users: require("./models/users.js"),
  },
};
