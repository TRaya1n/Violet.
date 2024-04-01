const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { ReadEventFiles, ReadCommandFiles, Logger } = require("./utils/utility");
const { connect } = require("./db/index");
const { configDotenv } = require("dotenv");
configDotenv();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
  allowedMentions: { repliedUser: false },
});

client.commands = new Collection();

client.logger = new Logger();

ReadEventFiles(client);
connect();
ReadCommandFiles(client);
client.login();
