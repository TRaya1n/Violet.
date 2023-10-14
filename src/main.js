// Import the required modules.
const { Violet } = require("./Violet/Client");
const { EmbedBuilder, WebhookClient } = require("discord.js");
const chalk = require("chalk");
const moment = require("moment");
require("dotenv").config();

// Configure the client
const client = new Violet();

//https://nodejs.org/dist/latest-v18.x/docs/api/process.html#event-uncaughtexception
process.on("uncaughtException", (err, origin) => {
  client.catchError(false, err, "uncaughtException");
});

//https://nodejs.org/dist/latest-v18.x/docs/api/process.html#event-unhandledrejection
process.on("unhandledRejection", (reason, promise) => {
  console.log(reason, promise);
  client.catchError(false, reason, "unhandledRejection");
});

process.on("warning", (warning) => {
  console.log(
    chalk.red("<system>"),
    chalk.blue(
      `Name: ${warning.name}\nMessage: ${warning.message}\nStack: ${warning.stack}`
    )
  );
});

client.on("message", (text) => {
  // Create the webhook client
  const webhook = new WebhookClient({
    url: process.env.WEBHOOKS_GUILD_LOGS,
  });

  // log the messagw to console
  console.log(
    chalk.red("system:message>"),
    chalk.blue(text ? text : "Invalid text")
  );

  // Varibles
  const date = moment(new Date().getTime()).format("LLL");

  // config the embed
  const embed = new EmbedBuilder()
    .setDescription(`[${date}] ${text}`)
    .setColor("Red");

  webhook.send({ embeds: [embed] }).catch(() => {});
});

client.start();
