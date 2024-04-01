const { SlashCommandBuilder } = require("discord.js");
const { ExecuteCommandInteraction } = require("../utils/utility");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("config")
    .setDescription("Config the server settings!")
    .addSubcommand((input) => {
      return input
        .setName("log")
        .setDescription("Configure the logging module.");
    }),
  execute: (interaction) => {
    ExecuteCommandInteraction(interaction);
  },
};
