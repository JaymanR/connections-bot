const {Schema, model} = require('mongoose');

const levelSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    guildId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    xp: {
        type: Number,
        default: 0,
    },
    games: {
        type: Number,
        default: 0,
    },
    correctGuesses: {
        type: Number,
        default: 0,
    },
    incorrectGuesses: {
        type: Number,
        default: 0,
    },
    level: {
        type: Number,
        default: 1,
    },
    date: {
        type: String,
        required: true,
    },
});

module.exports = model('Level', levelSchema);