const { EmbedBuilder } = require("discord.js");

module.exports = async (client, oldChannel, channel) => {
  const { guild } = channel;
  let type;
  switch (channel.type) {
    case 0:
      type = "Text Channel";
      break;
    case 2:
      type = "Voice Channel";
      break;
    case 4:
      type = "Category";
      break;
    case 5:
      type = "Announcement";
      break;
    default:
      type = "Channel";
      break;
  }

  if (oldChannel.name !== channel.name) {
    const embed = new EmbedBuilder()
      .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
      .setTitle(`${type} Updated: ${channel}`)
      .setColor("Red")
      .setDescription(`**Name:** #${oldChannel.name} -> **#${channel.name}**`);
    send(embed);
  }

  if (oldChannel.topic !== channel.topic) {
    const embed = new EmbedBuilder()
      .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
      .setTitle(`${type} Updated: ${channel}`)
      .setColor("Red")
      .setDescription(
        `**Topic:** ${oldChannel.topic ? oldChannel.topic : "{empty}"} -> **${
          channel.topic ? channel.topic : "{empty}"
        }**`
      );
    send(embed);
  }

  if (oldChannel.position !== channel.position) {
    const embed = new EmbedBuilder()
      .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
      .setTitle(`${type} Updated: ${channel}`)
      .setColor("Red")
      .setDescription(
        `**Position:** ${oldChannel.position} -> **${channel.position}**`
      );
    send(embed);
  }

  if (oldChannel.type !== channel.type) {
    const embed = new EmbedBuilder()
      .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
      .setTitle(`${type} Updated: ${channel}`)
      .setColor("Red")
      .setDescription(
        `**Type:** ${oldChannel.type} -> **[${channel.type}](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)**`
      );
    send(embed);
  }

  if (oldChannel.nsfw !== channel.nsfw) {
    const embed = new EmbedBuilder()
      .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
      .setTitle(`${type} Updated: ${channel}`)
      .setColor("Red")
      .setDescription(`**Nsfw:** ${oldChannel.nsfw} -> **${channel.nsfw}**`);
    send(embed);
  }

  // Voice channel (only)
  if (oldChannel.rtcRegion !== channel.rtcRegion) {
    const embed = new EmbedBuilder()
      .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
      .setTitle(`${type} Updated: ${channel}`)
      .setColor("Red")
      .setDescription(
        `**Region:** ${oldChannel.rtcRegion} -> **${channel.rtcRegion}**`
      );
    send(embed);
  }

  if (oldChannel.userLimit !== channel.userLimit) {
    const embed = new EmbedBuilder()
      .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
      .setTitle(`${type} Updated: ${channel}`)
      .setColor("Red")
      .setDescription(
        `**User Limit:** ${oldChannel.userLimit} -> **${channel.userLimit}**`
      );
    send(embed);
  }

  if (oldChannel.bitrate !== channel.bitrate) {
    const embed = new EmbedBuilder()
      .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
      .setTitle(`${type} Updated: ${channel}`)
      .setColor("Red")
      .setDescription(
        `**Bitrate:** ${oldChannel.bitrate}kbps -> **${channel.bitrate}kbps**`
      );
    send(embed);
  }

  if (oldChannel.videoQualityMode !== channel.videoQualityMode) {
    const embed = new EmbedBuilder()
      .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
      .setTitle(`${type} Updated: ${channel}`)
      .setColor("Red")
      .setDescription(
        `**Video Quality:** ${oldChannel.videoQualityMode} -> **${channel.videoQualityMode}**\n**Types:** 1 = Auto, 2 = 720p (Full)`
      );
    send(embed);
  }

  async function send(e) {
    const data = await client.db.settings.findOne({ guild: guild.id });
    if (data && data.config && data.config.channel) {
      const logChannel = guild.channels.cache.get(data.config.channel);
      if (logChannel) {
        logChannel.send({ embeds: [e] });
      }
    }
  }
};

module.exports.config = {
  name: "channelUpdate",
  type: "on",
};
