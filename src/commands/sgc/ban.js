const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { getColor } = require("../../utils/helper.js");

module.exports = async (client, interaction) => {
  const { guild, options, user } = interaction;
  const member = guild.members.cache.get(options.getUser("member").id);
  const reason = options.getString("reason") || "No reason provided";
  const color = await getColor(client, user.id);

  if (
    !interaction.member.permissions.has(
      PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers
    )
  ) {
    const _permissions = new EmbedBuilder()
      .setDescription(
        "<:actions_warning:1157299441963909150> | You don't have enough permissions to use this command."
      )
      .setColor(color);

    return interaction.reply({ embeds: [_permissions], ephemeral: true });
  }

  if (member.banable) {
    const c_permissions = new EmbedBuilder()
      .setDescription(
        "<:actions_warning:1157299441963909150> | I can't ban this member."
      )
      .setColor(color);

    return interaction.reply({ embeds: [c_permissions], ephemeral: true });
  }

  if (!member.manageable) {
    const m_permissions = new EmbedBuilder()
      .setDescription(
        "<:actions_Xtick:1157298381950025789> | This member is not manage able by me."
      )
      .setColor(color);

    return interaction.reply({ embeds: [m_permissions], ephemeral: true });
  }

  try {
    let dmed = true;
    const dm = new EmbedBuilder()
      .setDescription(
        `<:actions_warning:1157299441963909150> | You have been banned from ${guild.name} by ${interaction.member}`
      )
      .setColor(color);
    member.send({ embeds: [dm] }).catch(() => {
      dmed = false;
    });

    const embed = new EmbedBuilder()
      .setDescription(
        `<:actions_Ltick:1157298411163357184> | ${member} has been banned - ${reason}`
      )
      .setColor(color);

    await guild.bans.create(member.id, { reason });
    interaction.reply({ embeds: [embed] });
  } catch (e) {
    client.catchError(interaction, e, __dirname);
  }
};
