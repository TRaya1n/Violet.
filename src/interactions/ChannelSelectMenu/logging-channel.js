const {
  ChannelSelectMenuInteraction,
  EmbedBuilder,
  SelectMenuOptionBuilder,
} = require("discord.js");
const log = require("../../db/models/log");
const emojis = require("../../utils/constants/emojis.json");

/**
 * @param {ChannelSelectMenuInteraction} interaction
 */
module.exports = async (interaction) => {
  await interaction.deferUpdate();
  const selectedChannel = interaction.values.at(0);

  const data = await log.findOneAndUpdate(
    { guildId: interaction.guildId },
    { channel: { id: selectedChannel, status: true } },
    { new: true, upsert: true },
  );

  const embed = new EmbedBuilder()
    .setAuthor({
      name: interaction.user.username,
      iconURL: interaction.user.displayAvatarURL(),
    })
    .setTimestamp()
    .setDescription(
      `${emojis.Others.settings._} - **Updated Channel Logging Settings**\n${emojis.Utility.point} Status: **${data.channel.status ? "Enabled" : "Disabled"}**\n${emojis.Utility.point} Channel: <#${data.channel.id}>`,
    )
    .setColor('Blurple')

  return interaction.editReply({ embeds: [embed], components: [] });
};
