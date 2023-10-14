const {
  EmbedBuilder,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
module.exports = async (client, interaction) => {
  const modal = new ModalBuilder()
    .setCustomId("modal_sg_ap")
    .setTitle("Suggestion Accept");
  const reasonTextInput = new TextInputBuilder()
    .setCustomId("reason_ap")
    .setLabel("Reason?")
    .setStyle(TextInputStyle.Short);
  const row = new ActionRowBuilder().addComponents(reasonTextInput);
  modal.addComponents(row);
  await interaction.showModal(modal);
};
