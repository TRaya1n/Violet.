const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("log")
    .setDescription("log related commands")
    .setDMPermission(false)
    .addSubcommand((s) =>
      s
        .setName("set_message")
        .setDescription("Set the channel for message logging")
        .addChannelOption((op) =>
          op
            .setName("channel")
            .setDescription("leave this option blank if you want to disable")
        )
    )
    .addSubcommand((s) =>
      s
        .setName("set_channel")
        .setDescription("Set the channel for channel logging")
        .addChannelOption((op) =>
          op
            .setName("channel")
            .setDescription("leave this option blank if you want to disable")
        )
    )
    .addSubcommand((s) =>
      s
        .setName("set_member")
        .setDescription("Set the channel for member logging")
        .addChannelOption((op) =>
          op
            .setName("channel")
            .setDescription("leave this option blank if you want to disable")
        )
    ),
  run: async (client, interaction) => {
    client.loadSubcommands(interaction);
  },
};
