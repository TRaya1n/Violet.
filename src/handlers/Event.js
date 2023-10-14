// Import the required modules.
const path = require("path");
const fs = require("fs");

module.exports = async (client) => {
  try {
    const folders = fs.readdirSync(path.join("src", "events"));
    for (const folder of folders) {
      const files = fs.readdirSync(path.join("src", "events", folder));
      for (const file of files) {
        const data = require(`../events/${folder}/${file}`);
        if (data.config) {
          client[data.config.type](data.config.name, data.bind(null, client));
        }
      }
    }
  } catch (e) {
    client.catchError(false, e, __dirname);
  }
};
