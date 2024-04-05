const {
  ChatInputCommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");
const emojis = require("../../../utils/constants/emojis.json");
const log = require("../../../db/models/log");

/**
 * @param {ChatInputCommandInteraction} interaction
 */
module.exports = async (interaction) => {
  await interaction.deferReply({ ephemeral: true });

  const data = await log.findOne({ guildId: interaction.guildId });
  if (!data) await log.create({ guildId: interaction.guildId });

  const embed = new EmbedBuilder()
    .setAuthor({
      name: interaction.user.username,
      iconURL: interaction.user.displayAvatarURL(),
    })
    .setDescription(
      `${emojis.Utility.wait} - **Please select a type of logging you want to configure.**`,
    )
    .setColor("Blurple")
    .setTimestamp();

  const row = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("logging-type_select")
      .setPlaceholder("Select A Type!")
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel("Channel")
          .setDescription("Configure channel logging settings.")
          .setEmoji({ id: emojis.Others.inbox.id })
          .setValue("channel"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Message")
          .setDescription("Configure message logging settings.")
          .setEmoji({ id: emojis.Others.message.id })
          .setValue("message"),
      ),
  );

  return interaction.editReply({
    embeds: [embed],
    components: [row],
  });
};
