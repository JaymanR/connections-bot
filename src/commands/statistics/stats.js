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

    const mentionedUserId = interaction.options.get("target-user")?.value;
    const targetUserId = mentionedUserId || interaction.member.id;
    const targetUserObject = await interaction.guild.members.fetch(
      targetUserId
    );

    const fetchedLevel = await Level.findOne({
      userId: targetUserId,
      guildId: interaction.guild.id,
    });

    if (!fetchedLevel) {
      interaction.editReply(
        mentionedUserId
          ? `${targetUserObject.user.tag} doesn't have any answer's posted yet.`
          : "You don't have any levels yet."
      );
      return;
    }

    let allLevels = await Level.find({ guildId: interaction.guild.id }).select(
      "-_id userId level xp"
    );

    allLevels.sort((a, b) => {
      if (a.level === b.level) {
        return b.xp - a.xp;
      } else {
        return b.level - a.level;
      }
    });

    let currentRank =
      allLevels.findIndex((lvl) => lvl.userId === targetUserId) + 1;

    try {
      const rank = new EmbedBuilder()
        .setAuthor({
          name: `${targetUserObject.user.username}`,
          iconURL: targetUserObject.user.displayAvatarURL(),
        })
        .setTitle("Statistics")
        .setColor("Random")
        .addFields(
          {
            name: "rank",
            value: `${currentRank}`,
          },
          {
            name: "level",
            value: `${fetchedLevel.level}`,
            inline: true,
          }
        )
        .addFields(
          {
            name: "games",
            value: `${fetchedLevel.games}`,
            //inline: true,
          },
          {
            name: "correct",
            value: `${fetchedLevel.correctGuesses}`,
            inline: true,
          },
          {
            name: "incorrect",
            value: `${fetchedLevel.incorrectGuesses}`,
            inline: true,
          }
        );

      interaction.editReply({ embeds: [rank] });
    } catch (error) {
      console.log(error);
    }
  },

  //deleted: true,
  name: "stats",
  description: "Shows the user's stats.",
  options: [
    {
      name: "target-user",
      description: "Show's the mentioned user's stats.",
      type: ApplicationCommandOptionType.Mentionable,
    },
  ],
};
