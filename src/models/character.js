const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    lv: {
        type: Number,
        required: true
    },
    updated: {
        type: Date,
        default: Date.now()
    }
});

const characterModel = mongoose.model('characterModel', characterSchema);

module.exports = characterModel;