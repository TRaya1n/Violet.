// Import the required modules.
const { EmbedBuilder } = require("discord.js");
const { getColor } = require("../../utils/helper.js");

/**
 * Command server members
 * last updated 3/o/23
 */
module.exports = async (client, interaction) => {
  try {
    // Defer the interaction
    const { guild, user } = interaction;
    await interaction.deferReply();
    const color = await getColor(client, user.id);

    // Config the embed
    const embed = new EmbedBuilder()
      .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL()}` })
      .setDescription(`${guild.memberCount} Members`)
      .setFooter({ text: `${guild.id}` })
      .setTimestamp()
      .setColor(color);

    // Finally reply with the embed
    interaction.editReply({ embeds: [embed] });
  } catch (e) {
    client.catchError(interaction, e, __dirname);
  }
};
