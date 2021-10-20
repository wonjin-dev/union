const mongoose = require('mongoose');

const unionSchema = new mongoose.Schema({
    lv: {
        type: Number,
        required: true
    },
    updated: {
        type: Date,
        default: Date.now()
    }
});

const unionModel = mongoose.model('unionModel', unionSchema);

module.exports = unionModel;