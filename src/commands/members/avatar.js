// Import the required modules.
const { EmbedBuilder } = require("discord.js");
const { getColor } = require("../../utils/helper.js");

/**
 * Command members avatar
 * last updated 2/o/23 dev rayaan
 */
module.exports = async (client, interaction) => {
  try {
    // Load the options before sending message
    const { options, guild, user } = interaction;
    await interaction.deferReply();
    const op = options.getUser("member") || user;
    const member = guild.members.cache.get(op.id);
    const color = await getColor(client, user.id);

    // Config the embed
    const embed = new EmbedBuilder()
      .setAuthor({ name: user.displayName, iconURL: user.displayAvatarURL() })
      .setImage(member.displayAvatarURL({ extension: "png", size: 1024 }))
      .setColor(color);

    // Finally reply
    interaction.editReply({ embeds: [embed] });
  } catch (e) {
    client.catchError(interaction, e, __dirname);
  }
};
