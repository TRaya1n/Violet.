const {
  Client,
  ButtonInteraction,
  EmbedBuilder,
  channelLink,
} = require("discord.js");
const { models } = require('../../db/index');

/**
 *
 * @param {Client} client
 * @param {ButtonInteraction} interaction
 */
module.exports = async (client, interaction) => {
  await interaction.message.delete().catch(console.error);

  await interaction.deferReply();

  const embed = new EmbedBuilder()
    .setAuthor({
      name: interaction.user.username,
      iconURL: interaction.user.displayAvatarURL(),
    })
    .setDescription(`Set **channel** log\nSend a channel ID/link`)
    .setColor("Orange")
    .setTimestamp();

  interaction.editReply({ embeds: [embed] });

  const collector = await interaction.channel.createMessageCollector({
    filter: (m) => m.author.id === interaction.user.id,
  });

  collector.on("collect", async (message) => {
    const msg = await message.channel.send(`\`Validating data...\``);

    if (message.content.includes("https://discord.com/channels/")) {
      const channel = message.guild.channels.cache.get(message.content.slice(49, 69));

      if (channel) {
        await models.log.findOneAndUpdate(
            { Id: message.guild.id },
            { channel: channel.id },
            { upsert: true }
        );

        const embed = new EmbedBuilder()
        .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
        .setDescription(`Set **channel** log as <#${channel.id}>`)
        .setColor('Green')
        .setTimestamp();

        msg.edit({ content: null, embeds: [embed] });
      }

    } else if (message.content.length >= 19) {

    } else {
        message.reply({ content: `Invalid channel ID/link` });
    }
  });
};
