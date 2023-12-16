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
    }),
  execute: (client, interaction) => {
    ExecuteCommandInteraction(client, interaction);
  },
};
