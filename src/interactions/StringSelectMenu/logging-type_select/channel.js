const {
  StringSelectMenuInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelSelectMenuBuilder,
  ChannelType,
} = require("discord.js");
const log = require("../../../db/models/log");
const emojis = require("../../../utils/constants/emojis.json");

/**
 * @param {StringSelectMenuInteraction} interaction
 */
module.exports = async (interaction) => {
  await interaction.deferUpdate({ ephemeral: true });
  const data = await log.findOne({ guildId: interaction.guildId });

  const status = data.channel.status ? data.channel.status : false;
  const channel = data.channel.id ? data.channel.id : null;

  const embed = new EmbedBuilder()
    .setAuthor({
      name: interaction.user.username,
      iconURL: interaction.user.displayAvatarURL(),
    })
    .setDescription(
      `${emojis.Others.settings._} - **Channel Logging Settings**\n${emojis.Utility.point} Status: **{status}**`.replace(
        "{status}",
        status != false ? "Enabled" : "Disabled",
      ),
    )
    .setColor("Blurple")
    .setTimestamp();

  if (channel != null) {
    embed.data.description +=
      `\n${emojis.Utility.point} Channel: <#{mention}>\n\n${emojis.Utility.wait} - *Update the settings by clicking the buttons below.*`.replace(
        "{mention}",
        channel,
      );
  } else {
    embed.data.description += `\n\n${emojis.Utility.wait} - *Update the settings by clicking the buttons below.*`;
  }

  const row = new ActionRowBuilder();
  if (status != true) {
    row.setComponents(
      new ButtonBuilder()
        .setCustomId("@logging-channel_enable")
        .setStyle(ButtonStyle.Success)
        .setLabel("Enable")
        .setDisabled(true)
    );
  } else {
    row.setComponents(
      new ButtonBuilder()
        .setCustomId("@logging-channel_disable")
        .setStyle(ButtonStyle.Danger)
        .setLabel("Disable"),
    );
  }

  const channelSelect = new ChannelSelectMenuBuilder()
    .setCustomId("logging-channel")
    .setPlaceholder(`Select A Channel!`)
    .setChannelTypes([ChannelType.GuildText]);

  if (channel != null) {
    channelSelect.addDefaultChannels([channel]);
  }

  const selectRow = new ActionRowBuilder().addComponents(channelSelect);

  return interaction.editReply({
    embeds: [embed],
    components: [selectRow, row],
  });
};
