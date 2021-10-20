const moment = require('moment');
const mongoose = require('mongoose');

const unionSchema = new mongoose.Schema({
    lv: {
        type: Number,
        required: true
    },
    updated: {
        type: Date,
        default: moment().add(9, 'hours').format('YYYY-MM-DD hh:mm:ss')
    },
    updatedyear: {
        type: Number,
        default: moment().add(9, 'hours').year()
    },
    updatedmonth: {
        type: Number,
        default: moment().add(9, 'hours').month()
    },
    updatedday: {
        type: Number,
        default: moment().add(9, 'hours').day()
    }
});

const unionModel = mongoose.model('unionModel', unionSchema);

module.exports = unionModel;