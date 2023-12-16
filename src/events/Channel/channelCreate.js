const { BaseChannel, EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'channelCreate',
    /**
     * 
     * @param {BaseChannel} channel 
     */
    execute: async (channel) => {
        const { guild, client } = channel;

        if (channel.partial) channel.fetch().catch(console.error);

        const embed = new EmbedBuilder()
        .setAuthor({
            name: guild.name,
            iconURL: guild.iconURL()
        })
        .setDescription(`**>>>** Channel Created **<<<**\n **>** **Name:** ${channel.name}\n **>** **Id:** ${channel.id}`)
        .setTimestamp()
        .setColor('Orange');

        return;
    }
}