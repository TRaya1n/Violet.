// Import the required modules.
const { EmbedBuilder } = require("discord.js");
const { customSubstring } = require("../../utils/helper");
const { getColor } = require("../../utils/helper.js");

/**
 * Command members info
 * last updated 2/o/23 dev rayaan
 */
module.exports = async (client, interaction) => {
  try {
    const { options, guild, user } = interaction;
    await interaction.deferReply();
    const op = options.getUser("member") || interaction.member;
    const member = guild.members.cache.get(op.id);
    const color = await getColor(client, user.id);

    // Information variables
    const createdTime = Math.floor(member.user.createdTimestamp / 1000);
    const joinedTime = Math.floor(member.joinedTimestamp / 1000);
    let roles = member.roles.cache
      .filter((r) => r.id !== guild.id)
      .map((r) => r)
      .join(", ");

    const embed = new EmbedBuilder()
      .setAuthor({ name: user.displayName, iconURL: user.displayAvatarURL() })
      .setThumbnail(member.displayAvatarURL())
      .setColor(color);

    if (member.nickname) {
      embed.addFields({ name: "Nickname", value: `- **${member.nickname}**` });
    } else {
      embed.addFields({ name: "Name", value: `- **${member.user.username}**` });
    }

    embed.addFields(
      { name: "Created at", value: `- <t:${createdTime}:F>` },
      { name: "Joined at", value: `- <t:${joinedTime}:F>` },
      {
        name: "Roles",
        value: `${
          customSubstring(roles, 1003)
            ? customSubstring(roles, 1003)
            : "No Roles"
        }`,
      },
    );

    interaction.editReply({ embeds: [embed] });
  } catch (e) {
    client.catchError(interaction, e, __dirname);
  }
};
