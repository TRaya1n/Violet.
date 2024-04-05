const { ChannelSelectMenuInteraction, EmbedBuilder } = require("discord.js");
const log = require("../../db/models/log");
const emojis = require('../../utils/constants/emojis.json');

/**
 * @param {ChannelSelectMenuInteraction} interaction
 */
module.exports = async (interaction) => {
    await interaction.deferUpdate();
    const selectedChannel = interaction.values.at(0);

    const data = await log.findOneAndUpdate({ guildId: interaction.guildId }, { message: { status: true, id: selectedChannel } }, { new: true, upsert: true });

    const embed = new EmbedBuilder()
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
    .setDescription(`${emojis.Others.settings._} - **Updated Message Logging Settings**\n${emojis.Utility.point} Status: Enabled\n${emojis.Utility.point} Channel: <#${selectedChannel}>`)
    .setColor('Blurple')
    .setTimestamp();

    return interaction.editReply({ embeds: [embed], components: [] });
}