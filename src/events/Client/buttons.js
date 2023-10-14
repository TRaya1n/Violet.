const {
  EmbedBuilder,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
const path = require("node:path");

module.exports = async (client, interaction) => {
  if (interaction.isButton()) {
    try {
      loadButtons(interaction);
    } catch (e) {
      return e;
    }
  }
};

module.exports.config = {
  name: "interactionCreate",
  type: "on",
};

const loadButtons = (interaction) => {
  require(path.resolve("src", "buttons", interaction.customId))(
    interaction.client,
    interaction
  );
};
