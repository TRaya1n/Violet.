const { BaseInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   * @param {BaseInteraction} interaction
   */
  execute: async (interaction) => {
    const { client } = interaction;

    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) return;

      command.execute(interaction);
    } else if (interaction.isStringSelectMenu()) {
      console.log(interaction.customId, interaction.values);
      try {
        const dirname = interaction.customId.toLowerCase();
        const filename = interaction.values.at(0).toLowerCase();
        require(`../../interactions/SelectMenu/${dirname}/${filename}.js`)(interaction);
      } catch (error) {
        client.logger.error(error);
      }
    }
  },
};
