// Import modules.
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { getColor } = require("../../utils/helper.js");

/**
 * +\
 * last updated 6/o/23 dev rayaan
 */
module.exports = async (client, interaction) => {
  const color = await getColor(client, interaction.user.id);
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setURL("https://discord.gg/uQaUj9rp")
      .setLabel("Support")
  );

  const embed = new EmbedBuilder()
    .setDescription(
      "Need help with the bot? join here: ||https://discord.gg/uQaUj9rp||"
    )
    .setColor(color);

  interaction.reply({ embeds: [embed], components: [row] });
};
