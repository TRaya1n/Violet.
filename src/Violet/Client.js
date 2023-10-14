// Import the required modules.
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const { connect, models } = require("../db/index.js");
const { catchError } = require("../utils/helper.js");
const { QuickDB } = require("quick.db");

class Violet extends Client {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
      partials: [
        Partials.GuildMember,
        Partials.Channel,
        Partials.Message,
        Partials.User,
      ],
    });

    this.commands = new Collection();
    this.commandsJSON = [];
    this.db = models;
    this.catchError = catchError;
    this.colors = new QuickDB();
  }

  /**
   * get a channel by ID
   * @param {snowflake} id
   * @example
   * const channel = this.getChannel(1157300295769014362);
   * console.log(channel);
   * channel.send({ content: 'Hello from mellowbot' });
   */
  getChannel(id) {
    const channel = this.channels.cache.get(id);
    return channel ? channel : false;
  }

  /**
   */
  loadSubcommands(interaction) {
    const { options } = interaction;
    if (options.getSubcommand()) {
      require(path.resolve(
        "src",
        "commands",
        interaction.commandName,
        options.getSubcommand()
      ))(this, interaction);
    }
  }

  loadSGC(interaction) {
    require(path.resolve("src", "commands", "sgc", interaction.commandName))(
      this,
      interaction
    );
  }

  /**
   * login to Discord
   * requires the handler files
   */
  start() {
    connect();
    console.log(chalk.red("<system:client>"), chalk.blue(`Client is logging`));
    this.login();

    fs.readdirSync("./src/handlers").forEach((file) => {
      require(`../handlers/${file}`)(this);
    });
  }
}

module.exports = { Violet };
