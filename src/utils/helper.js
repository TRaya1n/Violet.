// Import the required modules.
const { Routes, REST, WebhookClient, EmbedBuilder } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  /**
   * Register application commands
   * @param {import('discord.js').Client} client
   */
  registerCommands: async (client) => {
    const rest = new REST({ version: "10" }).setToken(
      process.env.DISCORD_TOKEN
    );
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: client.commandsJSON,
    });

    console.log(
      chalk.red("<system:client>"),
      chalk.blue("Updated (/) application commands")
    );
  },

  /**
   * Determines if a string is longer than the given length, and if so
   * substrings it and appends an ellipsis.
   *
   * @param {string} str The string to shorten.
   * @param {number} len The maximum allowed length for the string.
   * @returns {string} The potentially shortened string.
   */
  customSubstring: (str, len) => {
    return str.length > len ? str.substring(0, len - 7) + "...more" : str;
  },

  /**
   * Catch errors, and sends them to logs
   */
  catchError: (int, error, dir) => {
    const x = (str, len) => {
      return str.length > len ? str.substring(0, len - 3) + "..." : str;
    };
    console.log(chalk.red(error));
    // Webhook Client
    //const webhook = new WebhookClient({ url: process.env.WEBHOOKS_ERROR_LOGS });
    const cxx = new EmbedBuilder()
      .setDescription(`${error}`)
      .setFooter({
        text: `${int ? int.guild.id : "false"} - ${
          int ? int.guild.name : "false"
        } > ${dir}`,
      })
      .setColor("Blue");
   // webhook.send({ embeds: [cxx] });

    const embed = new EmbedBuilder()
      .setDescription("An Error occurred while executing this command")
      .addFields({ name: "Error", value: `${error}` })
      .setColor("Red");

    if (int) {
      if (int.deffered) {
        return int.editReply({ embeds: [embed] });
      } else {
        return int.reply({ embeds: [embed], ephemeral: true });
      }
    }
  },

  /**
   * get a color of user they set.
   * {String} userId
   */
  getColor: async (client, userId) => {
    const color = await client.colors.get(`colors_${userId}`);
    if (color) {
      return color;
    } else {
      return "#7F00FF";
    }
  },

  setColor: async (client, userId, hex) => {
    return await client.colors.set(`colors_${userId}`, hex);
  },
};
