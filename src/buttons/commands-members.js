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
          name: "/member avatar",
          value: `> [Get a member's or you're avatar.] {/member avatar [member(defaults to you.)]}`,
        },
        {
          name: "/member info",
          value: `> [Get information of a member.] {/member info [member(defaults to you.)]}`,
        }
      )
      .setColor("Random");

    interaction.editReply({ embeds: [embed] });
  } catch (e) {
    client.catchError(interaction, e, __dirname);
  }
};
