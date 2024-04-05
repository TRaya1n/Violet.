const { EmbedBuilder } = require("discord.js");

module.exports = async (client, interaction) => {
  try {
    const ping = (t) => {
      if (t) {
        return (client.ws.ping % 60000) / 1000;
      } else return client.ws.ping;
    };

    const embed = new EmbedBuilder()
      .setDescription(`**Ping:** ${ping()}ms *(${ping("s")}s)*`)
      .setColor("Navy");

    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  } catch (e) {
    client.catchError(interaction, e, __dirname);
  }
};
