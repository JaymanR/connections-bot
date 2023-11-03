require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const eventHandler = require('./handlers/eventHandler.js');;

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});
/** 
client.on('messageCreate', (message) => {
  const channel = message.guild.channels.cache.get('1167212482243350569');
  const msg = message.content;
  try {
    if (msg.slice(0, 11) === 'Connections') {
      message.member.roles.add(
        message.guild.roles.cache.find((r) => r.name === 'connectioned')
      );
    } else if (msg.toLocaleLowerCase() === 'daily reset of connections') {
      console.log('else if is working');
      resetConnectioned(message)
        .then(() => {
          channel.permissionOverwrites.create(
            channel.guild.roles.cache.find((r) => r.name === 'connectioned'),
            {
              ViewChannel: true,
              SendMessages: true,
            }
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
  } catch (error) {
    console.log(error);
  }
});

function resetConnectioned(message) {
  return new Promise((resolve, reject) => {
    let connectionedRole = message.guild.roles.cache.find(
      (r) => r.name === 'connectioned'
    );
    const temp = connectionedRole;
    message.guild.roles
      .create({
        name: 'connectioned',
        color: temp.color,
      })
      .then((newRole) => {
        temp.delete().then(() => {
          resolve(newRole);
        });
      })
      .catch(reject);
  });
}
**/
eventHandler(client);

client.login(process.env.TOKEN);
