const { EmbedBuilder } = require("discord.js");
const { getColor } = require("../../utils/helper.js");

module.exports = async (client, interaction) => {
  try {
    const { options, guild, user } = interaction;
    const op = options.getUser("member") || interaction.member;
    const member = guild.members.cache.get(op.id);
    const color = await getColor(client, user.id);

    const roles = member.roles.cache
      .filter((role) => role.id !== guild.id)
      .sort((a, b) => b.position - a.position)
      .map((role) => role)
      .join("\n");

    const embed = new EmbedBuilder()
      .setAuthor({
        name: member.displayName,
        iconURL: member.displayAvatarURL(),
      })
      .setDescription(`${roles}`)
      .setColor(color);

    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  } catch (e) {
    client.catchError(interaction, e, __dirname);
  }
};
