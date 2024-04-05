const chalk = require("chalk");
const {
  Client,
  REST,
  Routes,
  ChatInputCommandInteraction,
} = require("discord.js");
const { readdirSync } = require("fs");

function ReadEventFiles(client = Client) {
  const folders = readdirSync("./src/events/");
  for (const folder of folders) {
    const files = readdirSync(`./src/events/${folder}`);
    for (const file of files) {
      const event = require(`../events/${folder}/${file}`);
      if (event.name && event.execute) {
        client.on(event.name, (...args) => event.execute(...args));
      } else {
        Logger.prototype.warn(`[${folder}/${file}]: Missing #name || #execute`);
      }
    }
  }
}

function ReadCommandFiles(client = Client) {
  const commandsArray = [];
  const files = readdirSync("./src/application/");
  for (const file of files) {
    const object = require(`../application/${file}`);
    client.commands.set(object.data.name, object);
    commandsArray.push(object.data);
  }

  DeployApplicationCommands(commandsArray);
}

async function DeployApplicationCommands(commands) {
  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

  Logger.prototype.info(
    `Initialized REST - Deploying application commands (/)`,
  );

  const data = await rest
    .put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    })
    .catch(console.error);

  Logger.prototype.info(`Deployed (${data.length}) application commands (/)`);

  return data;
}

/**
 * @param {Client} client
 * @param {ChatInputCommandInteraction} interaction
 */
function ExecuteCommandInteraction(interaction) {
  if (interaction.options.getSubcommandGroup()) {
    return require(
      `../interactions/ChatInput/${
        interaction.commandName
      }/${interaction.options.getSubcommandGroup()}/${interaction.options.getSubcommand()}.js`,
    )(interaction);
  } else if (!interaction.options._subcommand) {
    return require(`../interactions/ChatInput/${interaction.commandName}.js`)(
      interaction,
    );
  } else {
    return require(
      `../interactions/ChatInput/${
        interaction.commandName
      }/${interaction.options.getSubcommand()}.js`,
    )(interaction);
  }
}

class Logger {
  info(...str) {
    console.info(chalk.red(`[INFO] -`), chalk.green(str));
  }

  warn(...str) {
    console.warn(chalk.red(`[WARN] -`), chalk.yellow(str));
  }

  error(error) {
    console.error(chalk.redBright(`[ERROR] -`), error);
  }
}

module.exports = {
  ReadEventFiles,
  ReadCommandFiles,
  DeployApplicationCommands,
  ExecuteCommandInteraction,
  Logger,
};
