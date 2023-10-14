// Import thr required modules.
const { EmbedBuilder } = require("discord.js");

module.exports = async (client, message) => {
  try {
    const { guild, author, member } = message;
    // Check is the message is in a guild if not, dont read;
    if (!guild) return;

    // sometimes the member might be null if it is return nothing
    if (!member) return;

    if (author) {
      if (author.bot) {
        return;
      }
    }

    // Embed
    const embed = new EmbedBuilder();

    // Check is the message has attachment(s) if so add a field to the embed
    if (message.attachments.size >= 1) {
      const attall = message.attachments
        .map((x) => `[${x.name}](${x.url})`)
        .join("\n");
      embed.addFields({
        name: "Attachment(s)",
        value: `${attall}`,
      });
    }

    embed
      .setAuthor({
        name: member.displayName,
        iconURL: member.displayAvatarURL(),
      })
      .setFooter({ text: `${message.id} - ${guild.id}` })
      .setDescription(`${message.content ? message.content : "No content."}`)
      .setTimestamp()
      .setColor("#FF7F50");

    const data = await client.db.settings.findOne({
      guild: guild.id,
    });
    if (data && data.config && data.config.message) {
      const logChannel = guild.channels.cache.get(data.config.message);
      if (logChannel) {
        logChannel.send({ embeds: [embed] }).catch();
      }
    }
  } catch (e) {
    client.catchError(false, e, __dirname);
  }
};

module.exports.config = {
  name: "messageDelete",
  type: "on",
};
