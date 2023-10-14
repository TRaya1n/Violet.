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
          name: "/kick",
          value: `> [Kick a member from this server] {/kick {member} [reason(leave this blank;reason = No reason provided)]}`,
        },
        {
          name: "/ban",
          value: `> [Ban a member from this server.] {/ban {member} [reason(leave this blank;reason = No reason provided)]}`,
        }
      )
      .setColor("Random");

    interaction.editReply({ embeds: [embed] });
  } catch (e) {
    client.catchError(interaction, e, __dirname);
  }
};
