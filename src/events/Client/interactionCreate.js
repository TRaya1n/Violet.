module.exports = {
  name: "interactionCreate",
  /**
   * @param {import("discord.js").Interaction} interaction
   */
  execute: async (interaction) => {
    const { client } = interaction;

    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) return;

      command.execute(interaction);
    } else if (interaction.isStringSelectMenu()) {
      try {
        if (interaction.values.length < 2) {
          const dirname = interaction.customId.toLowerCase();
          const filename = interaction.values.at(0).toLowerCase();
          require(
            `../../interactions/StringSelectMenu/${dirname}/${filename}.js`,
          )(interaction);
        }
      } catch (error) {
        client.logger.error(error);
      }
    } else if (interaction.isChannelSelectMenu()) {
      try {
        if (interaction.values.length < 2) {
          const dirname = interaction.customId.toLowerCase();
          const filename = interaction.values.at(0).toLowerCase();
          if (!isNaN(filename)) {
            require(`../../interactions/ChannelSelectMenu/${dirname}`)(
              interaction,
            );
          } else {
            require(
              `../../interactions/ChannelSelectMenu/${dirname}/${filename}`,
            )(interaction);
          }
        }
      } catch (error) {
        client.logger.error(error);
      }
    } else if (interaction.isButton()) {
      try {
        const dirname = interaction.customId.split('-').at(0).toLowerCase();
        const filename = interaction.customId.split('-').at(1).toLowerCase();
        require(`../../interactions/Buttons/${dirname}/${filename}`)(interaction);
      } catch (error) {
        client.logger.error(error)
      }
    }
  },
};
