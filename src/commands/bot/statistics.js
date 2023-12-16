// Import the reequired modules.
const { EmbedBuilder } = require("discord.js");
const os = require("node:os");
const moment = require("moment");
require("moment-duration-format");
const { getColor } = require("../../utils/helper.js");

/**
 * Command bot statistics
 * last updated 5/o/23 dev rayaan
 */
module.exports = async (client, interaction) => {
  // Defer the interaction
  await interaction.deferReply();
  const color = await getColor(client, interaction.user.id);

  const uptime = moment
    .duration(client.uptime)
    .format(" D [days], H [hrs], m [mins], s [secs]");
  const users = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
  const guilds = client.guilds.cache.size;
  const cpu = await os.cpus();
  const system = {
    x7xm: { model: cpu[0].model },
    tmem: formatBytes(os.totalmem()),
  };

  // Config the embed
  const embed = new EmbedBuilder()
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`**Basic statistics ${client.user}!**`)
    .addFields(
      {
        name: `Users`,
        value: `- **${users}**`,
      },
      {
        name: `Guilds`,
        value: `- **${guilds}**`,
      },
      {
        name: "Uptime",
        value: `- **${uptime}**`,
      },
      {
        name: "CPU",
        value: `- **${system.x7xm.model}**`,
      },
      {
        name: `Memory`,
        value: `- **${system.tmem}**`,
      },
    )
    .setColor(color);

  // Finally reply
  interaction.editReply({ embeds: [embed] });
};

function formatBytes(a, b = 2) {
  if (!+a) return "0 Bytes";
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024));
  return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${
    ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"][d]
  }`;
}
