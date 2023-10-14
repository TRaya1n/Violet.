const chalk = require("chalk");
const {
  EmbedBuilder,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = async (client, interaction) => {
  if (interaction.isChatInputCommand()) {
    try {
      const command = client.commands.get(interaction.commandName);

      if (!command) {
        return interaction.reply({
          content: `Looks like we ran in to an error 😅 - I wasn't able to find this command.`,
          ephemeral: true,
        });
      }

      command.run(client, interaction);
      client.emit(
        "message",
        `Command used in ${interaction.guild.name}, ${interaction.commandName}`
      );
    } catch (e) {
      client.catchError(interaction, e, __dirname);
    }
  }
};

module.exports.config = {
  name: "interactionCreate",
  type: "on",
};
