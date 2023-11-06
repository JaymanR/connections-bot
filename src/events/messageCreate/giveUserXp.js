const { Client, Message } = require("discord.js");
const Level = require("../../models/Level.js");
const calculateLevelXp = require("../../utils/calculateLevelXp.js");
const checkUserAnswer = require("../../utils/checkUserAnswer.js");

function getXp(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function xpToGive(array) {
  if (array[0] === 4 && !array[1]) {
    return getXp(7, 17);
  } else if (array[1] === 4 && !array[0]) {
    return getXp(3, 12);
  } else if (array[0] < array[1]) {
    return getXp(4, 14);
  } else if (array[0] > array[1]) {
    return getXp(6, 16);
  } else {
    return getXp(5, 15);
  }
}

/**
 *
 * @param {Client} client
 * @param {Message} message
 *
 */
module.exports = async (client, message) => {

  if (!message.inGuild() || message.author.bot) return;

  try {
    if (message.content.replace(/\n/g, "").slice(0, 18) === "Connections Puzzle") {
      
      const puzzleAnswer = message.content.replace(/\n/g, "").slice(23);
      const userGuesses = checkUserAnswer(puzzleAnswer); //array [Number correct, Number incorrect]
      const xpAmount = xpToGive(userGuesses);

      const query = {
        userId: message.author.id,
        guildId: message.guild.id,
      };

      const level = await Level.findOne(query);

      if (level) {
        if (level.date === new Date().toDateString()) return;

        level.xp += xpAmount;
        level.correctGuesses += userGuesses[0];
        level.incorrectGuesses += userGuesses[1];
        level.games += 1;
        level.date = new Date().toDateString();

        if (level.xp > calculateLevelXp(level.level)) {
          level.xp = 0;
          level.level += 1;

          message.channel.send(
            `${message.member} you have leveled up to **level ${level.level}**`
          );
        }

        await level.save().catch((error) => {
          console.log(`Error saving updated level - ${error}`);
          return;
        });
      }

      //if (!level)
      else {
        //create new level
        const newLevel = new Level({
          userId: message.author.id,
          guildId: message.guild.id,
          xp: xpAmount,
          correctGuesses: userGuesses[0],
          incorrectGuesses: userGuesses[1],
          games: 1,
          date: new Date().toDateString(),
        });

        await newLevel.save();
      }
    }
  } catch (error) {
    console.log(`Error giving xp - ${error}`);
  }
};
