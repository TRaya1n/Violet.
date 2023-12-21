const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  AllowedMentionsTypes
} = require("discord.js");
const { ReadEventFiles, ReadCommandFiles, Logger } = require("./utils/utility");
const { connect } = require("./db/index");
const { configDotenv } = require("dotenv");
configDotenv();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
  partials: [Partials.GuildMember, Partials.Message, Partials.Channel],
  allowedMentions: { repliedUser: false }
});

client.commands = new Collection();

const logger = new Logger();
console.log = logger.log;

ReadEventFiles(client);
connect();
ReadCommandFiles(client);
client.login();
