const {
  Client,
  ApplicationCommandOptionType,
  EmbedBuilder,
} = require("discord.js");
const Level = require("../../models/Level.js");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      interaction.reply("You can only run this command inside a server.");
      return;
    }

    await interaction.deferReply();

    const leaderboardInfo = await Level.find({
      guildId: interaction.guild.id,
    })
      .sort({ level: -1, xp: -1 })
      .limit(10);

    if (leaderboardInfo.length === 0) {
      interaction.editReply("No leaderboard data available.");
      return;
    }

    try {
      const leaderboard = new EmbedBuilder()
        .setTitle("Leaderboard")
        .setThumbnail(interaction.guild.iconURL())
        .setColor("#3498db") // Use a specific color
        .addFields(
          leaderboardInfo.map((data, index) => ({
            name: `#${index + 1} ${data.name}`,
            value: `Level: ${data.level} 
             Games: ${data.games} 
              Correct: ${data.correctGuesses} 
               Incorrect: ${data.incorrectGuesses}`,
          }))
        );

      interaction.editReply({ embeds: [leaderboard] });
    } catch (error) {
      console.log(error);
    }
  },

  //deleted: true,
  name: "leaderboard",
  description: "Shows the server leaderboard.",
};
