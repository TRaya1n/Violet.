const {
  Client,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

/**
 *
 * @param {Client} client
 * @param {ChatInputCommandInteraction} interaction
 */
module.exports = async (client, interaction) => {
  await interaction.deferReply();

  const embed = new EmbedBuilder()
    .setAuthor({
      name: interaction.user.username,
      iconURL: interaction.user.displayAvatarURL(),
    })
    .setDescription(`Config settings for **${interaction.guild.name}**`)
    .addFields({
      name: "Modules",
      value: `Logging - ... - ...`,
    })
    .setColor("Orange")
    .setTimestamp();

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("config::logging")
      .setLabel("Logging")
      .setStyle(ButtonStyle.Primary),
  );

  interaction.editReply({ embeds: [embed], components: [row] });
};
