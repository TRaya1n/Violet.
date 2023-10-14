// Import the required modules.
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const { registerCommands } = require("../utils/helper.js");

module.exports = async (client) => {
  try {
    console.log(
      chalk.red("<system>"),
      chalk.blue("Started reading command files...")
    );
    const folders = fs.readdirSync(path.join("src", "Interactions"));
    for (const folder of folders) {
      const files = fs.readdirSync(path.join("src", "Interactions", folder));
      for (const file of files) {
        const ob = require(path.resolve("src", "Interactions", folder, file));
        client.commands.set(ob.data.name, ob);
        client.commandsJSON.push(ob.data);
      }
    }

    registerCommands(client);
  } catch (e) {
    client.catchError(false, e, __dirname);
  }
};
