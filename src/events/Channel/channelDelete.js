const { BaseChannel, EmbedBuilder, GuildFeature } = require("discord.js");
const log = require("../../db/models/log");

module.exports = {
  name: "channelDelete",
  /**
   * @param {BaseChannel} channel
   */
  execute: async (channel) => {
    const { guild, client } = channel;

    if (channel.partial && !channel.name && !channel.id) return;

    const embed = new EmbedBuilder()
      .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
      .setDescription(
        `**>>>** Channel Deleted **<<<**\n **>** **Name:** ${channel.name}\n **>** **Id:** ${channel.id}`,
      )
      .setTimestamp()
      .setColor("Red");

      const data = await log.findOne({ Id: guild.id });
      if (data.channel) {
        const logchannel = guild.channels.cache.get(data.channel);
        logchannel.send({ embeds: [embed] });
      }
  },
};
