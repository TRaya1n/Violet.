const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Want help using the bot?"),
  run: async (client, interaction) => {
    client.loadSGC(interaction);
  },
};
