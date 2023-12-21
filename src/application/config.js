const {
  SlashCommandBuilder,
  PermissionsBitField: { Flags },
} = require("discord.js");
const { ExecuteCommandInteraction } = require("../utils/utility");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("config")
    .setDescription("Config settings for this server!")
    .setDMPermission(false)
    .setDefaultMemberPermissions(Flags.ManageGuild),
  execute: (client, interaction) => {
    ExecuteCommandInteraction(client, interaction);
  },
};
