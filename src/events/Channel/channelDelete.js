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
        `**>>>** Channel Deleted **<<<**\n **>** **Name:** ${channel.name}\n **>** **guildId:** ${channel.id}`,
      )
      .setTimestamp()
      .setColor("Red");

    const data = await log.findOne({ guildId: guild.id });
    if (data.channel) {
      const logchannel = guild.channels.cache.get(data.channel);
      logchannel.send({ embeds: [embed] });
    }
  },
};
