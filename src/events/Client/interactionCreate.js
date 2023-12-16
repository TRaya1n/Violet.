const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  execute: async (interaction = ChatInputCommandInteraction) => {
    const { client } = interaction;

    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      console.warn("[COMMAND] Unknown command used", interaction.commandName);
      return;
    }

    command.execute(client, interaction);
  },
};
