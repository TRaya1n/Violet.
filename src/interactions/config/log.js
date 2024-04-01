const { ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");

/**
 * @param {ChatInputCommandInteraction} interaction 
 */
module.exports = (interaction) => {

    const embed = new EmbedBuilder()
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
    .setDescription(`Please select a type of logging you want to configure.`)
    .setColor('Blurple')
    .setTimestamp();

    const row = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
        .setCustomId('config-log.type')
        .setPlaceholder('Select A Type!')
        .addOptions(
            new StringSelectMenuOptionBuilder()
            .setLabel('Channel')
            .setDescription('Configure channel logging settings.')
            .setValue('type-channel')
        )
    )

    return interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
}