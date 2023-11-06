const { ActivityType } = require("discord.js");

module.exports = (client) => {
    client.user.setActivity({
        name: 'Under Construction',
        type: ActivityType.Custom,
    })
};