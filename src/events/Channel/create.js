// Import the required modules.
const { EmbedBuilder } = require("discord.js");

module.exports = async (client, channel) => {
  try {
    const { guild } = channel;

    // If not in the guild; return nothing.
    if (!guild) return;

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

    // Config the embed
    const embed = new EmbedBuilder()
      .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
      .setTitle(`${type} Created: ${channel}`)
      .setDescription(
        `**Name:** ${channel.name} *(${channel.id})*\n**Viewable:** ${channel.viewable}`
      )
      .setTimestamp()
      .setColor("Blue");

    const data = await client.db.settings.findOne({ guild: guild.id });
    if (data && data.config && data.config.channel) {
      const logChannel = guild.channels.cache.get(data.config.channel);
      if (logChannel) {
        logChannel.send({ embeds: [embed] });
        client.emit("message", `Channel created and logged in ${guild.name}`);
      }
    }
  } catch (e) {
    client.catchError(false, e, __dirname);
  }
};

module.exports.config = {
  name: "channelCreate",
  type: "on",
};
