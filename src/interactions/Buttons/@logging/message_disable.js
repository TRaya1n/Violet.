const { ButtonInteraction, EmbedBuilder } = require("discord.js");
const log = require("../../../db/models/log");
const emojis = require('../../../utils/constants/emojis.json');

/**
 * @param {ButtonInteraction} interaction
 */
module.exports = async (interaction) => {
    await interaction.deferUpdate();

    await log.findOneAndUpdate({ guildId: interaction.guildId }, { message: { status: false, id: null } });

    const embed = new EmbedBuilder()
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
    .setDescription(`${emojis.Others.settings._} - **Updated Message Logging Settings**\n${emojis.Utility.point} Status: **Disabled**`)
    .setColor('Blurple')
    .setTimestamp();

    return interaction.editReply({ embeds: [embed], components: [] });
}