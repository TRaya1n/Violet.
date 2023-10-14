const { EmbedBuilder } = require("discord.js");

module.exports = async (client, interaction) => {
  try {
    await interaction.deferReply({ ephemeral: true });
    const { member } = interaction;

    const embed = new EmbedBuilder()
      .setAuthor({
        name: member.displayName,
        iconURL: member.displayAvatarURL(),
      })
      .setDescription(
        `**Field Name: command name\nField value: [description] {usage}**`
      )
      .addFields(
        {
          name: "/log set_channel",
          value: `> [Setup the channel to log all the channel events in this server.] {/log set_channel [channel(leave option blank to disable this module.)]}`,
        },
        {
          name: "/log set_member",
          value: `> [Setup the channel to log member events in this server.] {/log set_member [channel(leave option blank to disable this module.)]}`,
        },
        {
          name: "/log set_message",
          value: `> [Setup the channel to log message events in this server.] {/log set_message [channel(leave option blank to disable this module.)]}`,
        }
      )
      .setColor("Random");

    interaction.editReply({ embeds: [embed] });
  } catch (e) {
    client.catchError(interaction, e, __dirname);
  }
};
