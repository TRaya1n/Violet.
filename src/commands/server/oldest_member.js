// Import the required modules.
const { EmbedBuilder } = require("discord.js");
const moment = require("moment");
const { getColor } = require("../../utils/helper.js");

/**
 * Command server oldest member
 * last updated 3/o/23 dev rayaan
 */
module.exports = async (client, interaction) => {
  try {
    // Defer the interaction.
    const { guild, user } = interaction;
    await interaction.deferReply();
    const color = await getColor(client, user.id);

    // Fetch all the guild members
    const members = await guild.members.fetch();
    const userMember = members
      .filter((m) => !m.user.bot)
      .sort((a, b) => a.joinedAt - b.joinedAt)
      .first();

    // Config the embed
    const embed = new EmbedBuilder()
      .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL()}` })
      .addFields(
        {
          name: "Member",
          value: `- **${userMember}** *(${userMember.id})*`,
        },
        {
          name: "Joined at",
          value: `- **${moment(userMember.joinedTimestamp).format("LLL")}**`,
        }
      )
      .setColor(color);

    // Finally reply
    interaction.editReply({ embeds: [embed] });
  } catch (e) {
    client.catchError(interaction, e, __dirname);
  }
};
