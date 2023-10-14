const { EmbedBuilder } = require("discord.js");

module.exports = async (client, member) => {
  const { guild } = member;

  const logEmbed = new EmbedBuilder()
    .setAuthor({ name: member.displayName, iconURL: member.displayAvatarURL() })
    .setTitle(`Member Joined: ${member}`)
    .setDescription(
      `**Username:** ${member.user.username}\n**Joined At:** <t:${Math.floor(
        member.joinedTimestamp / 1000
      )}:R>\n**Created At:** <t:${Math.floor(
        member.user.createdTimestamp / 1000
      )}:R>`
    )
    .setColor("Orange");

  const data = await client.db.settings.findOne({ guild: guild.id });
  if (data && data.config && data.config.member) {
    const _ = guild.channels.cache.get(data.config.member);
    if (_) {
      _.send({ embeds: [logEmbed] });
    }
  }

  /*const welcomeEmbed = new EmbedBuilder()
  //....

  const d = await client.db.guild.findOne({ guild: guild.id });
  if (d && d.welcome && d.welcome.channel) {
    const c = guild.channels.cache.get(d.welcome.channel);
    if (c) {
      c.send({ embeds: [welcomeEmbed] });
    }
  }*/
};

module.exports.config = {
  name: "guildMemberAdd",
  type: "on",
};
