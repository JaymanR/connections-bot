require('dotenv').config();

const {Client, IntentsBitField} = require("discord.js");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', async(c) => {
    console.log(`${c.user.tag} is online.`)
});

client.on('messageCreate', (message) => {
   try {
     if (message.content === 'reset') {
        resetConnectioned(message);
     }
   } catch (error) {
    console.log(error);
   }
});

function resetConnectioned(message) {
    const role = message.guild.roles.cache.find(r => r.name === 'connectioned');
    message.guild.roles.create({
        name: role.name,
        color: role.color,
        hoist: role.hoist,
        position: role.position,
        permissions: role.permissions,
        mentionable: role.mentionable,
    });
    role.delete('yes.')
}

client.login(process.env.TOKEN);