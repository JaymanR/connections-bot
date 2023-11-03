module.exports = {
  name: "bing",
  description: "bong!",
  //devOnly: Boolean,
  //testOnly: Boolean,
  //options: Object[],

  callback: (client, interaction) => {
    interaction.reply(`bong! ${client.ws.ping}ms`);
  },
};
