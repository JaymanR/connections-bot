require("colors");
const moment = require("moment-timezone");

const now = moment().tz("America/New_York");

module.exports = (client) => {
    console.log(`[${now.toDate().toDateString()}]✅ ${client.user.tag} is online.`.cyan);
};
