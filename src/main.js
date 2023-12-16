const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const { ReadEventFiles, ReadCommandFiles } = require("./utils/utility");
const { configDotenv } = require("dotenv");
configDotenv();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
  partials: [Partials.GuildMember, Partials.Message, Partials.Channel],
});

client.commands = new Collection();

ReadEventFiles(client);
ReadCommandFiles(client);
client.login();
