const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ComponentType,
} = require("discord.js");
const { getColor, setColor } = require("../../utils/helper.js");

module.exports = async (client, interaction) => {
  const { options, user } = interaction;
  const color = await getColor(client, user.id);
  console.log(color);

  // p = blue, s = grey, = s = green,
  const pssd = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId("p")
        .setStyle(ButtonStyle.Primary)
        .setLabel("blue")
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("se")
        .setStyle(ButtonStyle.Secondary)
        .setLabel("Gray")
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("su")
        .setStyle(ButtonStyle.Success)
        .setLabel("Green")
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("d")
        .setStyle(ButtonStyle.Danger)
        .setLabel("Red")
    );
  const embed = new EmbedBuilder()
    .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
    .setDescription(`Pick one of the color's provided.`)
    .setTimestamp()
    .setColor(color ? color : "Green");

  interaction.reply({ embeds: [embed], components: [pssd], ephemeral: true });

  const collector = await interaction.channel.createMessageComponentCollector({
    componentType: ComponentType.Button,
    time: 60_000,
  });

  collector.on("collect", async (i) => {
    if (i.user.id !== interaction.user.id) {
      return i.reply({
        content: "This button is not for you.",
        ephemeral: true,
      });
    }

    switch (i.customId) {
      case "p":
        await i.deferReply({ ephemeral: true });
        setColor(client, interaction.user.id, "Blue");
        i.editReply("Set color as blue");
        break;
      case "se":
        await i.deferReply({ ephemeral: true });
        setColor(client, interaction.user.id, "Grey");
        i.editReply("Set color as grey");
        break;
      case "su":
        await i.deferReply({ ephemeral: true });
        setColor(client, interaction.user.id, "Green");
        i.editReply("Set color as green");
        break;
      case "d":
        await i.deferReply({ ephemeral: true });
        setColor(client, interaction.user.id, "Red");
        i.editReply("Set color as red");
        break;
    }
  });
};
