const {
  Client,
  ButtonInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

/**
 * @param {Client} client
 * @param {ButtonInteraction} interaction
 */
module.exports = async (client, interaction) => {
  await interaction.deferReply();

  const embed = new EmbedBuilder()
    .setAuthor({
      name: interaction.user.username,
      iconURL: interaction.user.displayAvatarURL(),
    })
    .setDescription(`Select the type of log you want to set.`)
    .setColor("Orange")
    .setTimestamp();

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("config::logging::channel")
      .setLabel("Channel")
      .setStyle(ButtonStyle.Primary),
  );

  interaction.editReply({ embeds: [embed], components: [row] });
};
