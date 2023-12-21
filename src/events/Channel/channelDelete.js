const { BaseChannel, EmbedBuilder, GuildFeature } = require("discord.js");

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
      .setColor("Orange");

    const c = guild.channels.cache.get("1178766923115286568");
    c.send({ embeds: [embed] });
  },
};
