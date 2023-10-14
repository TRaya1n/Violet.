const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { getColor } = require("../../utils/helper.js");

module.exports = async (client, interaction) => {
  const { options, guild, user } = interaction;
  const member = guild.members.cache.get(options.getUser("member").id);
  const reason = options.getString("reason") || "No reason provided";
  const color = await getColor(client, user.id);

  if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) {
    const _permissions = new EmbedBuilder()
      .setDescription(
        `<:actions_Xtick:1157298381950025789> | You don't have enough permissions to use this command.`
      )
      .setColor(color);

    return interaction.reply({ embeds: [_permissions], ephemeral: true });
  }

  if (!member.kickable) {
    const n_permissions = new EmbedBuilder()
      .setDescription(
        `<:actions_Xtick:1157298381950025789> | I can't kick this member.`
      )
      .setColor(color);

    return interaction.reply({ embeds: [n_permissions], ephemeral: true });
  }

  try {
    let dmed = true;
    let error = false;
    const dm = new EmbedBuilder()
      .setDescription(
        `<:actions_warning:1157299441963909150> | You have been kicked from ${guild.name} by ${interaction.member} (${reason})`
      )
      .setColor(color);
    member.send({ embeds: [dm] }).catch(() => {
      let dmed = false;
    });

    const embed = new EmbedBuilder()
      .setDescription(
        `<:actions_Ltick:1157298411163357184> | Kicked ${member} - ${reason}`
      )
      .setColor("Green");

    await member.kick({ reason }).catch(() => {
      let error = true;
    });
    interaction.reply({ embeds: [embed] });

    if (error) {
      interaction.editReply("An error!!!");
    }
  } catch (e) {
    client.catchError(interaction, e, __dirname);
  }
};
