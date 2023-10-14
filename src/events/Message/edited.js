// Import the required modules.
const { EmbedBuilder } = require("discord.js");
const { customSubstring } = require("../../utils/helper.js");

module.exports = async (client, oldMessage, newMessage) => {
  try {
    // Check if the message is created in a guild if not, dont read;
    if (!newMessage.guild) return;
    if (!newMessage.member) return;

    // Check if this message belongs to a application
    if (newMessage.author) {
      if (newMessage.author.bot) {
        return;
      }
    }

    // Config the embed
    const embed = new EmbedBuilder()
      .setAuthor({
        name: newMessage.member.displayName,
        iconURL: newMessage.member.displayAvatarURL(),
      })
      .setDescription(
        `**[Jump To Message In ${newMessage.channel.name}](${newMessage.url})**\n\n**Before:** ${oldMessage.content}\n\n**After:** ${newMessage.content}`
      )
      .setFooter({ text: `${newMessage.id} - ${newMessage.guild.id}` })
      .setTimestamp()
      .setColor("#FF7F50");

    const data = await client.db.settings.findOne({
      guild: newMessage.guild.id,
    });
    if (data && data.config && data.config.message) {
      const logChannel = newMessage.guild.channels.cache.get(
        data.config.message
      );
      if (logChannel) {
        logChannel.send({ embeds: [embed] }).catch();
      }
    }
  } catch (e) {
    client.catchError(false, e, __dirname);
  }
};

module.exports.config = {
  name: "messageUpdate",
  type: "on",
};
