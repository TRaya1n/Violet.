const chalk = require("chalk");
const { ActivityType } = require("discord.js");

module.exports = {
  name: "ready",
  execute: async (client) => {
    console.log(`Logged in as ${client.user.username}`);

    setInterval((_) => {
      const tt = {
        users: `${client.guilds.cache.reduce(
          (a, b) => a + b.memberCount,
          0,
        )} Users`,
      };

      client.user.setActivity(`${tt.users}`, { type: ActivityType.Listening });
    }, 600000); // 10 mins
  },
};
