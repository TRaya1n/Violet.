// Import the required modules.
const chalk = require("chalk");
const { ActivityType } = require("discord.js");

module.exports = async (client) => {
  console.log(
    chalk.red("<system:client>"),
    chalk.blue(`Logged in as ${client.user.username}`)
  );

  setInterval((_) => {
    const tt = {
      users: `${client.guilds.cache.reduce(
        (a, b) => a + b.memberCount,
        0
      )} Users`,
    };

    client.user.setActivity(`${tt.users}`, { type: ActivityType.Listening });
  }, 600000); // 10 mins
};

module.exports.config = {
  name: "ready",
  type: "once",
};
