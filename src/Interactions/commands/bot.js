// Import the required modules.
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bot")
    .setDescription("bot related commands")
    .addSubcommand((s) => s.setName("ping").setDescription("Pong!"))
    .addSubcommand((s) =>
      s.setName("support").setDescription("Get bot's support server link")
    )
    .addSubcommand((s) =>
      s.setName("statistics").setDescription("Get interesting stats on bot")
    )
    .addSubcommand((s) =>
      s.setName("color").setDescription("Set the embed color of this bot.")
    ),
  run: async (client, interaction) => {
    client.loadSubcommands(interaction);
  },
};
