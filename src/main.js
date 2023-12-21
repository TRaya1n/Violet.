const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const { ReadEventFiles, ReadCommandFiles, Logger } = require("./utils/utility");
const { connect } = require("./db/index");
const { configDotenv } = require("dotenv");
configDotenv();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
  partials: [Partials.GuildMember, Partials.Message, Partials.Channel],
});

client.commands = new Collection();

const logger = new Logger();
console.log = logger.log;

ReadEventFiles(client);
connect();
ReadCommandFiles(client);
client.login();
