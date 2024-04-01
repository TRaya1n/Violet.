const { SlashCommandBuilder } = require("discord.js");
const { ExecuteCommandInteraction } = require("../utils/utility");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bot")
    .setDescription("Bot commands!")
    .setDMPermission(false)
    .addSubcommand((option) => {
      option.setName("ping").setDescription("Returns client ping!");
      return option;
    })
    .addSubcommand((option) => {
      option.setName("stats").setDescription("View stats on bot!");
      return option;
    }),
  execute: (interaction) => {
    ExecuteCommandInteraction(interaction);
  },
};
