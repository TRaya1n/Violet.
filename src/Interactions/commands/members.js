const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("members")
    .setDescription("server member related commands.")
    .setDMPermission(false)
    .addSubcommand((s) =>
      s
        .setName("info")
        .setDescription("Get basic information on a specifc member.")
        .addUserOption((op) =>
          op
            .setName("member")
            .setDescription(
              "Provide a member to get information on defualts to you."
            )
            .setRequired(false)
        )
    )
    .addSubcommand((s) =>
      s
        .setName("avatar")
        .setDescription("Get a specific members avatar")
        .addUserOption((op) =>
          op
            .setName("member")
            .setDescription("Provide a member, defaults to you.")
            .setRequired(false)
        )
    )
    .addSubcommand((s) =>
      s
        .setName("roles")
        .setDescription("Get a list of roles of a member")
        .addUserOption((option) =>
          option
            .setName("member")
            .setDescription("Provide a member defaults to you.")
            .setRequired(false)
        )
    ),
  run: async (client, interaction) => {
    client.loadSubcommands(interaction);
  },
};
