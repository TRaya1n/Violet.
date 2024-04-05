const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  codeBlock,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("developer")
    .setDescription("Only developers can use this command.")
    .addStringOption((option) => {
      return option
        .setName("input")
        .setDescription("Input a value.")
        .setRequired(true);
    }),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  execute: async (interaction) => {
    if (interaction.user.id != "1125852865534107678") return;
    try {
      await interaction.deferReply({ ephemeral: true });

      const guild = interaction.guild;
      const member = interaction.member;
      const user = interaction.user;

      const evaled = eval(interaction.options.getString("input"));
      return interaction.editReply({
        content: `${codeBlock(await clean(evaled))}`,
      });
    } catch (error) {
      interaction
        .editReply({ content: `${codeBlock(error)}` })
        .catch(console.error);
    }
  },
};

async function clean(text) {
  if (text && text.constructor.name == "Promise") text = await text;
  if (typeof text !== "string")
    text = require("util").inspect(text, { depth: 1 });
  text = text
    .replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203));
  return text;
}
