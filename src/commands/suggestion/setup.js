// Import the required modules.
const {
  EmbedBuilder,
  PermissionsBitField: { Flags },
} = require("discord.js");
const { getColor } = require("../../utils/helper.js");

/**
 * Command suggestion setup
 * last updated 5/o/23 dev rayaan
 */
module.exports = async (client, interaction) => {
  try {
    // Defer the interaction
    await interaction.deferReply();
    const { options, guildId, member } = interaction;
    const channel = options.getChannel("channel");
    const data = await client.db.settings.findOne({ guild: guildId });
    const color = await getColor(client, member.id);

    if (!member.permissions.has(Flags.ManageChannels)) {
      const _permissions = new EmbedBuilder()
        .setDescription(`You don't have permissions to use this command`)
        .setColor(color);
      return interaction.editReply({ embeds: [_permissions] });
    }

    if (channel) {
      if (data) {
        // Config the embed
        const embed = new EmbedBuilder()
          .setDescription(
            `Successfully set <#${channel.id}> as suggestion channel.`
          )
          .setTimestamp()
          .setColor(color);
        // Set the data & save
        data.suggestion.channel = channel.id;
        data.save();
        // Finally reply
        return interaction.editReply({ embeds: [embed] });
      } else {
        // Config & save the new data
        new client.db.settings({
          guild: guild.id,
          suggestion: { channel: channel.id },
        }).save();
        // Config the embed
        const embed = new EmbedBuilder()
          .setDescription(
            `Successfully set <#${channel.id}> as suggestion channel.`
          )
          .setTimestamp()
          .setColor(color);
        // Finally reply
        return interaction.editReply({ embeds: [embed] });
      }
    } else {
      if (data) {
        data.suggestion.channel = null;
        data.save();
        // Config the embed
        const embed = new EmbedBuilder()
          .setDescription(`Removed suggestion channel.`)
          .setTimestamp()
          .setColor(color);
        // Finally reply
        return interaction.editReply({ embeds: [embed] });
      } else {
        // Config & save the new data
        new client.db.settings({
          guild: guild.id,
          suggestion: { channel: null },
        }).save();
        // Config the embed
        const embed = new EmbedBuilder()
          .setDescription(`Removed suggestion channel.`)
          .setTimestamp()
          .setColor(color);
        // Finally reply
        return interaction.editReply({ embeds: [embed] });
      }
    }
  } catch (e) {
    client.catchError(interaction, e, __dirname);
  }
};
