const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("suggestion")
    .setDescription("Suggestion related commands.")
    .setDMPermission(false)
    .addSubcommand((s) =>
      s
        .setName("setup")
        .setDescription("Set the server suggestion channel")
        .addChannelOption((op) =>
          op
            .setName("channel")
            .setDescription("the channel to set")
            .addChannelTypes(0)
        )
    )
    .addSubcommand((s) =>
      s
        .setName("send")
        .setDescription(
          "Send a suggestion if the server has a suggestion channel"
        )
        .addStringOption((op) =>
          op
            .setName("suggestion_message")
            .setDescription("Input you're suggestion message")
            .setMaxLength(1024)
            .setRequired(true)
        )
    ),
  run: async (client, interaction) => {
    client.loadSubcommands(interaction);
  },
};
