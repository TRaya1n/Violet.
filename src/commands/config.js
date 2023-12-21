const {
  Client,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");

/**
 *
 * @param {Client} client
 * @param {ChatInputCommandInteraction} interaction
 */
module.exports = async (client, interaction) => {
  interaction.reply('Config...')
};
