const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { getColor } = require("../../utils/helper.js");

module.exports = async (client, interaction) => {
  try {
    const { user } = interaction;
    const color = await getColor(client, user.id);

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("commands-bot")
          .setLabel("Bot")
          .setStyle(ButtonStyle.Secondary)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("commands-log")
          .setLabel("Log")
          .setStyle(ButtonStyle.Secondary)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("commands-members")
          .setLabel("Members")
          .setStyle(ButtonStyle.Secondary)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("commands-server")
          .setLabel("Server")
          .setStyle(ButtonStyle.Secondary)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("commands-suggestion")
          .setLabel("Suggestion")
          .setStyle(ButtonStyle.Secondary)
      );

    const row2 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("commands-mod")
        .setLabel("Moderation")
        .setStyle(ButtonStyle.Secondary)
    );

    const embed = new EmbedBuilder()
      .setDescription(
        `**<:mailbox:1152283154472767538> Want help? Use the butttons to see all the commands, description & usage.** *(Button Label = Command Category)*`
      )
      .setColor(color);

    interaction.reply({
      embeds: [embed],
      components: [row, row2],
      ephemeral: true,
    });
  } catch (e) {
    client.catchError(interaction, e, __dirname);
  }
};
