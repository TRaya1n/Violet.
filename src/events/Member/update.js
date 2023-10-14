const { EmbedBuilder } = require("discord.js");
const moment = require("moment");

module.exports = async (client, oldMember, member) => {
  const { guild } = member;

  if (oldMember.nickname !== member.nickname) {
    const embed1 = new EmbedBuilder()
      .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
      .setTitle(`${member} Updated Nickname`)
      .setDescription(
        `**Nickname:** ${
          oldMember.nickname ? oldMember.nickname : "{empty}"
        } -> **${member.nickname ? member.nickname : "{empty}"}**`
      )
      .setColor("Green");
    send(embed1);
  }

  if (
    oldMember.communicationDisabledUntil !== member.communicationDisabledUntil
  ) {
    const oldT = moment(oldMember.communicationDisabledUntil).format("LLL");
    const newT = moment(member.communicationDisabledUntil).format("LLL");
    const embed2 = new EmbedBuilder()
      .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
      .setTitle(`${member} Moderation Update`)
      .setDescription(`**Timeout Until:** ${oldT} -> **${newT}**`)
      .setColor("Orange");
    send(embed2);
  }

  async function send(e) {
    const data = await client.db.settings.findOne({ guild: guild.id });
    if (data && data.config && data.config.member) {
      const logChannel = guild.channels.cache.get(data.config.member);
      if (logChannel) {
        logChannel.send({ embeds: [e] });
      }
    }
  }
};

module.exports.config = {
  name: "guildMemberUpdate",
  type: "on",
};
