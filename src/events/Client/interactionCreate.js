const { BaseInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   * @param {BaseInteraction} interaction 
   */
  execute: async (interaction) => {
    const { client } = interaction;
    if (!interaction.guild.id === "1169388501633073162") {
      interaction.reply('Hello, this command is only avaible in the dev server.');
    }

    if (interaction.isChatInputCommand()) {

      const command = client.commands.get(interaction.commandName);
      if (!command) {
        console.warn("[COMMAND] Unknown command used", interaction.commandName);
        return;
      }

      command.execute(client, interaction);
    } else if (interaction.isButton()) {
      try {
        require(`../../commands/buttons/${interaction.customId.toLowerCase()}`)(client, interaction);
      } catch (error) {
        console.log(error)
      }
    }
  },
};
