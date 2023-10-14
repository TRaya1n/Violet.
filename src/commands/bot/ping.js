// Import the required modules.
const { EmbedBuilder } = require("discord.js");
const { getColor } = require("../../utils/helper.js");

/**
 * Command ping
 * last updated 2/o/23 dev rayaan
 */
module.exports = async (client, interaction) => {
  try {
    const color = await getColor(client, interaction.user.id);
    const ping = (t) => {
      if (t) {
        return (client.ws.ping % 60000) / 1000;
      } else return client.ws.ping;
    };

    const embed = new EmbedBuilder()
      .setDescription(`**Ping:** ${ping()} *(${ping("s")}s)*`)
      .setColor(color);

    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  } catch (e) {
    client.catchError(interaction, e, __dirname);
  }
};
