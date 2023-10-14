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
          name: "/bot ping",
          value: `> [Shows the bot's ping (${client.ws.ping}ms)] {/bot ping}`,
        },
        {
          name: "/bot statistics",
          value: `> [Get interesting stats on bot] {/bot statistics}`,
        },
        {
          name: "/bot support",
          value: `> [Returns bots support server] {/bot support}`,
        }
      )
      .setColor("Random");

    interaction.editReply({ embeds: [embed] });
  } catch (e) {
    client.catchError(interaction, e, __dirname);
  }
};
