# connections-bot

This is a discord bot that tracks user statistics from answers posted in a discord channel.
The bot tracks number of correct and incorrect guesses and gives the user xp dependent on how many correct guesses the user had.
Since the connections game resets every 24 hours, the user cannot post two answers within the day.
The bot will reply to your answer and submissions to confirm that your answer has been logged.

# How does it work

The bot uses an event listener that tracks the first line of the connections answer, typically starts with [connection #(number)].
Then it parses the entire string and checks for four consecutive square and track the guesses.
The bot then logs that data, determines an xp amount to give and saves it in a MongoDb database.
There are slash commands that users may use to get their rank in the server and display a leaderboard.
