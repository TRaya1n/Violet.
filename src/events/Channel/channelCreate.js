const { BaseChannel, EmbedBuilder } = require("discord.js");
const { models } = require("../../db/index");

module.exports = {
  name: "channelCreate",
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
        iconURL: guild.iconURL(),
      })
      .setDescription(
        `**>>>** Channel Created **<<<**\n **>** **Name:** ${channel.name}\n **>** **guildId:** ${channel.id}`,
      )
      .setTimestamp()
      .setColor("Green");

    const data = await models.log.findOne({ guildId: guild.id });
    if (data.channel) {
      const logchannel = guild.channels.cache.get(data.channel);
      logchannel.send({ embeds: [embed] });
    }
  },
};
