const { EmbedBuilder } = require("discord.js");

module.exports = async (client, channel) => {
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
      type = "Announcement Channel";
      break;
    default:
      type = "Channel";
      break;
  }

  const embed = new EmbedBuilder()
    .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
    .setTitle(`${type} Deleted: ${channel}`)
    .setDescription(`**Name:** ${channel.name}\n**Id:** ${channel.id}`)
    .setColor("Red");

  const data = await client.db.settings.findOne({ guild: guild.id });
  if (data && data.config && data.config.channel) {
    const logChannel = guild.channels.cache.get(data.config.channel);
    if (logChannel) {
      logChannel.send({ embeds: [embed] });
    }
  }
};

module.exports.config = {
  name: "channelDelete",
  type: "on",
};
