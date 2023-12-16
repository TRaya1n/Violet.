const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { ReadEventFiles } = require("./utils/utility");
const { configDotenv } = require("dotenv");
configDotenv();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
  partials: [Partials.GuildMember, Partials.Message, Partials.Channel],
});


ReadEventFiles(client);
client.login();
