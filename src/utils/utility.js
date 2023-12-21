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
        console.warn(
          `[${folder}/${file}]: Missing event#name || event#execute`,
        );
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

  console.log(`[REST] Initialized REST - Deploying application commands (/)`);

  const data = await rest
    .put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    })
    .catch(console.error);

  console.log(`[REST] Deployed application commands (/)`);

  return data;
}

/**
 * @param {Client} client
 * @param {ChatInputCommandInteraction} interaction
 */
function ExecuteCommandInteraction(client, interaction) {
  if (interaction.options.getSubcommandGroup()) {
    return require(
      `../commands/${
        interaction.commandName
      }/${interaction.options.getSubcommandGroup()}/${interaction.options.getSubcommand()}.js`,
    )(client, interaction);
  } else if (!interaction.options._subcommand) {
    return require(`../commands/${interaction.commandName}.js`)(
      client,
      interaction,
    );
  } else {
    return require(
      `../commands/${
        interaction.commandName
      }/${interaction.options.getSubcommand()}.js`,
    )(client, interaction);
  }
}

module.exports = {
  ReadEventFiles,
  ReadCommandFiles,
  DeployApplicationCommands,
  ExecuteCommandInteraction,
};
