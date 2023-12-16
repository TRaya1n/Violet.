// Import the required modules.
const {
  EmbedBuilder,
  PermissionsBitField: { Flags },
} = require("discord.js");
const { getColor } = require("../../utils/helper.js");

/**
 * Command log set message
 * last updated 3/o/23 dev rayaan
 */
module.exports = async (client, interaction) => {
  try {
    // Load the options & defer the interacrion
    const { options, guild, member } = interaction;
    const color = await getColor(client, member.id);
    await interaction.deferReply();
    const channel = options.getChannel("channel");
    const data = await client.db.settings.findOne({ guild: guild.id });

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
            `Successfully set <#${channel.id}> as member log channel.`,
          )
          .setTimestamp()
          .setColor(color);
        // Set the data & save
        data.config.member = channel.id;
        data.save();
        // Finally reply
        return interaction.editReply({ embeds: [embed] });
      } else {
        // Config & save the new data
        new client.db.settings({
          guild: guild.id,
          config: { member: channel.id },
        }).save();
        // Config the embed
        const embed = new EmbedBuilder()
          .setDescription(
            `Successfully set <#${channel.id}> as member log channel.`,
          )
          .setTimestamp()
          .setColor(color);
        // Finally reply
        return interaction.editReply({ embeds: [embed] });
      }
    } else {
      if (data) {
        data.config.member = null;
        data.save();
        // Config the embed
        const embed = new EmbedBuilder()
          .setDescription(`Removed member log channel.`)
          .setTimestamp()
          .setColor(color);
        // Finally reply
        return interaction.editReply({ embeds: [embed] });
      } else {
        // Config & save the new data
        new client.db.settings({
          guild: guild.id,
          config: { member: null },
        }).save();
        // Config the embed
        const embed = new EmbedBuilder()
          .setDescription(`Removed member log channel.`)
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
