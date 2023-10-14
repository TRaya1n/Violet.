// Import the required modules.
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("commands related to this server")
    .setDMPermission(false)
    .addSubcommand((s) =>
      s
        .setName("member_count")
        .setDescription("Get memberCount in this server.")
    )
    .addSubcommand((s) =>
      s
        .setName("oldest_member")
        .setDescription(
          "Get the oldest member in the server by there joined date"
        )
    )
    .addSubcommand((s) =>
      s
        .setName("youngest_member")
        .setDescription(
          "Get the youngest member in the server by there joined date"
        )
    ),
  run: async (client, interaction) => {
    client.loadSubcommands(interaction);
  },
};
