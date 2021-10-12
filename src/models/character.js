const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    lv: {
        type: Number,
        required: true
    }
});

const characterModel = mongoose.model('characterModel', characterSchema);

module.exports = characterModel;