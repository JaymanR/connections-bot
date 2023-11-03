module.exports = {
  //deleted: true,
  name: "ping",
  description: "your websocket ping",
  //devOnly: Boolean,
  //testOnly: Boolean,
  //options: Object[],

  callback: (client, interaction) => {
    interaction.reply(`${client.ws.ping}ms`);
  },
};
