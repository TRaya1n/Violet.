const { Client, ButtonInteraction } = require('discord.js');

/**
 * @param {Client} client 
 * @param {ButtonInteraction} interaction 
 */
module.exports = async (client, interaction) => {
    interaction.message.edit('Hello!')

    const m = await interaction.reply('...');
    m.delete();
}
