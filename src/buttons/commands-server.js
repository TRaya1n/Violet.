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
          name: "/server member_count",
          value: `> [Get the member count of this server.] {/server member_count}`,
        },
        {
          name: "/server oldest_member",
          value: `> [Get the oldest member in this server.] {/server oldest_member}`,
        },
        {
          name: "server youngest_member",
          value:
            "> [Get the youngest member in this server.] {/server youngest_member}",
        }
      )
      .setColor("Random");

    interaction.editReply({ embeds: [embed] });
  } catch (e) {
    client.catchError(interaction, e, __dirname);
  }
};
