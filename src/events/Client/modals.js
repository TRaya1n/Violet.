const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField: { Flags },
} = require("discord.js");

module.exports = async (client, interaction) => {
  if (!interaction.isModalSubmit()) return;

  if (interaction.customId === "modal_sg_ap") {
    handleSGAP(interaction, client);
  } else if (interaction.customId === "modal_sg_dn") {
    handleSGDN(interaction, client);
  }
};

module.exports.config = {
  name: "interactionCreate",
  type: "on",
};

async function handleSGAP(interaction, client) {
  try {
    await interaction.deferReply({ ephemeral: true });
    const { user, member } = interaction;
    const data = client.db.settings.findOne({ guild: interaction.guildId });
    if (!member.permissions.has(Flags.ManageChannels)) {
      const _permissions = new EmbedBuilder()
        .setDescription(`You don't have permissions to use this.`)
        .setColor("Red");
      return interaction.editReply({ embeds: [_permissions] });
    }

    if (data || data.suggestion || data.suggestion.channel) {
      const embed = interaction.message.embeds[0].data;

      // Suggestion Buttons (accept, deny)
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId("sg_ap")
            .setLabel("Accept")
            .setStyle(ButtonStyle.Primary)
            .setDisabled(true)
        )
        .addComponents(
          new ButtonBuilder()
            .setCustomId("sg_dn")
            .setLabel("Deny")
            .setStyle(ButtonStyle.Danger)
            .setDisabled(true)
        );

      const suggestionEmbed = new EmbedBuilder()
        .setAuthor({ name: embed.author.name, iconURL: embed.author.icon_url })
        .setThumbnail(embed.thumbnail.url)
        .setFooter({ text: embed.footer.text })
        .setDescription(embed.description)
        .addFields(
          {
            name: `${embed.fields[0].name}`,
            value: `${embed.fields[0].value}`,
          },
          {
            name: `${embed.fields[1].name}`,
            value: `Suggestion Approved`,
          },
          {
            name: `Reason from: ${user}`,
            value: `${interaction.fields.getTextInputValue("reason_ap")}`,
          }
        )
        .setColor("FF7F50");

      interaction.message.edit({
        embeds: [suggestionEmbed],
        componenets: [row],
      });

      interaction.editReply({
        content: `<:actions_Ltick:1157298411163357184> | Suggestion approved.`,
      });
    } else {
      interaction.editReply({
        content: `<:actions_Xtick:1157298381950025789> | No suggestion channel could be found in this server..`,
      });
    }
  } catch (_e) {
    client.catchError(interaction, _e, __dirname);
  }
}

async function handleSGDN(interaction, client) {
  try {
    await interaction.deferReply({ ephemeral: true });
    const { user, member } = interaction;
    const data = client.db.settings.findOne({ guild: interaction.guildId });
    if (!member.permissions.has(Flags.ManageChannels)) {
      const _permissions = new EmbedBuilder()
        .setDescription(`You don't have permissions to use this.`)
        .setColor("Red");
      return interaction.editReply({ embeds: [_permissions] });
    }
    if (data || data.suggestion || data.suggestion.channel) {
      const embed = interaction.message.embeds[0].data;

      // Suggestion Buttons (accept, deny)
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId("sg_ap")
            .setLabel("Accept")
            .setStyle(ButtonStyle.Primary)
            .setDisabled(true)
        )
        .addComponents(
          new ButtonBuilder()
            .setCustomId("sg_dn")
            .setLabel("Deny")
            .setStyle(ButtonStyle.Danger)
            .setDisabled(true)
        );

      const suggestionEmbed = new EmbedBuilder()
        .setAuthor({ name: embed.author.name, iconURL: embed.author.icon_url })
        .setThumbnail(embed.thumbnail.url)
        .setFooter({ text: embed.footer.text })
        .setDescription(embed.description)
        .addFields(
          {
            name: `${embed.fields[0].name}`,
            value: `${embed.fields[0].value}`,
          },
          {
            name: `${embed.fields[1].name}`,
            value: `Suggestion Denied`,
          },
          {
            name: `Reason from: ${user}`,
            value: `${interaction.fields.getTextInputValue("reason_dn")}`,
          }
        )
        .setColor("FF7F50");

      interaction.message.edit({
        embeds: [suggestionEmbed],
        componenets: [row],
      });

      interaction.editReply({
        content: `<:actions_Ltick:1157298411163357184> | Suggestion denied.`,
      });
    } else {
      interaction.editReply({
        content: `<:actions_Xtick:1157298381950025789> | No suggestion channel could be found in this server..`,
      });
    }
  } catch (_e) {
    client.catchError(interaction, _e, __dirname);
  }
}
