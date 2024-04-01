const {
  Client,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
/**
 *
 * @param {Client} client
 * @param {ChatInputCommandInteraction} interaction
 */
module.exports = async (client, interaction) => {
  // Information related to the bot
  const clientInformation = {
    guilds: client.guilds.cache.size,
    members: client.guilds.cache.reduce((a, b) => a + b.memberCount, 0),
    channels: client.channels.cache.size,
    ping: client.ws.ping,
  };

  // Information related to the operating system
  const uptime = moment
    .duration(client.uptime)
    .format(" D [days], H [hrs], m [mins], s [secs]");

  const embed = new EmbedBuilder()
    .setAuthor({
      name: interaction.user.username,
      iconURL: interaction.user.displayAvatarURL(),
    })
    .setThumbnail(client.user.displayAvatarURL())
    .addFields(
      {
        name: "Bot Information:",
        value: `- **Guilds:** ${clientInformation.guilds}\n- **Members:** ${clientInformation.members}\n- **Channels:** ${clientInformation.channels}\n- **Ping:** ${clientInformation.ping}ms`,
      },
      {
        name: "System Information:",
        value: `- **Uptime:** ${uptime}`,
      },
    )
    .setColor("Gold")
    .setTimestamp()
    .setFooter({ text: "Thank you for using Violet." });

  interaction.reply({ embeds: [embed] });
};
