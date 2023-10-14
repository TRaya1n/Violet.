// Import the required modules.
const { EmbedBuilder, WebhookClient } = require("discord.js");

module.exports = async (client, guild) => {
  try {
    // Webhook Client
    const webhook = new WebhookClient({ url: process.env.WEBHOOKS_GUILD_LOGS });

    // If the server has less than or equal to 10 members leave the guild and (dmo)
    if (guild.memberCount <= 10) {
      const owner = await guild.fetchOwner();
      const lessThen10 = new EmbedBuilder()
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setDescription(
          `Hello, ${owner.displayName}. We currently don't allow this bot to be under 10 member servers, we noticed that you're server has less then or equal to 10 member. When you're server reaches 10+ member you can invite me [here](https://discord.com/api/oauth2/authorize?client_id=1148254145690742884&permissions=1546389941446&scope=bot%20applications.commands)`
        )
        .setColor("Red");
      owner.send({ embeds: [lessThen10] }).catch(() => {});
      webhook.send({
        content: `Left, ${guild.name}.\nReason: has ltoet 10 members`,
      });
      return await guild.leave();
    }

    // Config the embed
    const embed = new EmbedBuilder()
      .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
      .addFields(
        {
          name: "Members",
          value: `${guild.memberCount}`,
        },
        {
          name: "Owner",
          value: `${guild.ownerId}`,
        }
      )
      .setColor("Green");

    // Finally reply
    webhook.send({ embeds: [embed] });
  } catch (e) {
    client.catchError(false, e, __dirname);
  }
};

module.exports.config = {
  name: "guildCreate",
  type: "on",
};
