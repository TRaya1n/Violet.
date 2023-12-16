const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { ReadEventFiles } = require('./utils/utility');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ],
    partials: [Partials.GuildMember, Partials.Message, Partials.Channel]
});

// Start the bot
//ReadEventFiles();
client.login();