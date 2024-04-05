const { ChannelSelectMenuBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require("discord.js");
const log = require("../../../db/models/log");
const emojis = require('../../../utils/constants/emojis.json');

/**
 * @param {StringSelectMenuInteraction} interaction
 */
module.exports = async (interaction) => {
    await interaction.deferUpdate();
    const data = await log.findOne({ guildId: interaction.guildId });

    const channel = data.message.id ? data.message.id : null;
    const status = data.message.status ? data.status : false;

    const embed = new EmbedBuilder()
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
    .setDescription(`${emojis.Others.settings._} - **Message Logging Settings**\n${emojis.Utility.point} Status: **${status ? 'Enabled' : 'Disabled'}**`)
    .setColor('Blurple')
    .setTimestamp();

    if (channel != null) {
        embed.data.description += `\n${emojis.Utility.point} Channel: <#${channel}>`;
    }

    embed.data.description += `\n\n${emojis.Utility.wait} - *Update the settings by clicking the below.*`;

    const row = new ActionRowBuilder();

    if (status != true) {
        row.setComponents(
            new ButtonBuilder()
            .setCustomId('@logging-message_enable')
            .setStyle(ButtonStyle.Success)
            .setLabel('Enable')
            .setDisabled(true)
        );
    } else {
        row.setComponents(
            new ButtonBuilder()
            .setCustomId('@logging-message_disable')
            .setStyle(ButtonStyle.Danger)
            .setLabel('Disable')
        );
    }

    const channelSelect = new ChannelSelectMenuBuilder()
    .setCustomId('logging-message')
    .setPlaceholder('Select A Channel!')
    .setChannelTypes([ChannelType.GuildText])

    if (channel != null) {
        channelSelect.setDefaultChannels([channel]);
    }

    const channelSelectRow = new ActionRowBuilder().addComponents(channelSelect);

    return interaction.editReply({ embeds: [embed], components: [channelSelectRow, row] })
}