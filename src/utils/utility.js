const { Client } = require("discord.js");
const { readdirSync } = require("fs");

function ReadEventFiles(client = Client) {
  const folders = readdirSync("./src/events/");
  for (const folder of folders) {
    const files = readdirSync(`./src/events/${folder}`);
    for (const file of files) {
      const event = require(`../events/${folder}/${file}`);
      if (event.name && event.execute) {
        client.on(event.name, (...args) => event.execute(...args));
      } else {
        console.warn(
          `[${folder}/${file}]: Missing event#name || event#execute`,
        );
      }
    }
  }
}

module.exports = {
  ReadEventFiles,
};
