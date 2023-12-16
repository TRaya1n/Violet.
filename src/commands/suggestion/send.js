// Import the required modules.
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { getColor } = require("../../utils/helper.js");

/**
 * Command suggestion send
 * last updated 5/o/23 dev rayaan
 */
module.exports = async (client, interaction) => {
  try {
    // Defer the interaction
    await interaction.deferReply({ ephemeral: true });
    const { options, guildId, guild, member } = interaction;
    const message = options.getString("suggestion_message");
    const data = await client.db.settings.findOne({ guild: guildId });
    const color = await getColor(client, member.id);

    if (data || data.suggestion) {
      const channel = guild.channels.cache.get(
        data.suggestion.channel ? data.suggestion.channel : "false",
      );
      if (channel) {
        // Suggestion Buttons (accept, deny)
        const row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId("sg_ap")
              .setLabel("Accept")
              .setStyle(ButtonStyle.Primary),
          )
          .addComponents(
            new ButtonBuilder()
              .setCustomId("sg_dn")
              .setLabel("Deny")
              .setStyle(ButtonStyle.Danger),
          );

        // Suggestion embed (this is the embed that will be sent to [channel])
        const sendEmbed = new EmbedBuilder()
          .setAuthor({
            name: member.displayName,
            iconURL: member.displayAvatarURL(),
          })
          .setDescription(`**Suggestion from ${member}**`)
          .addFields(
            {
              name: "Suggestion",
              value: `${message}`,
            },
            {
              name: "Status",
              value: `<:utils_refresh:1157295573255331942> Pending`,
            },
          )
          .setFooter({ text: `${member.id}` })
          .setThumbnail(
            "https://media.discordapp.net/attachments/1159394211636981822/1159394386489114734/idea.png",
          )
          .setColor("FF7F50");

        // send the message to [channel] with embed and componenets
        channel
          .send({ embeds: [sendEmbed], components: [row] })
          .catch(() => {});

        const embed = new EmbedBuilder()
          .setAuthor({
            name: member.displayName,
            iconURL: member.displayAvatarURL(),
          })
          .setDescription(
            `<:actions_Ltick:1157298411163357184> | **Sent you're suggestion in ${channel}**`,
          )
          .setColor(color);
        interaction.editReply({ embeds: [embed] });
      } else {
        const channelError = new EmbedBuilder()
          .setDescription(
            `**Error** - I coudn't find the suggestion channel in this server, you can set one up by doin **/suggestion setup**`,
          )
          .setColor(color);
        interaction.editReply({ embeds: [channelError] });
      }
    } else {
      const noData = new EmbedBuilder()
        .setDescription(
          `**Error** - There's no suggestion channel setup in this server, you can set one up by doin **/suggestion setup**`,
        )
        .setColor(color);
      interaction.editReply({ embeds: [noData] });
    }
  } catch (e) {
    client.catchError(interaction, e, __dirname);
  }
};
