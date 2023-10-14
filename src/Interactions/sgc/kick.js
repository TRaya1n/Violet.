const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a member in this server.")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMember)
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("The member to kick.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for kicking this member.")
    ),
  run: async (client, interaction) => {
    client.loadSGC(interaction);
  },
};
