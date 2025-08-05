//Creating the schemas

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    _id: Number,
    click: {
        type: Number,
        default: 1,
    },
    timeViewed: {
        type: Number,
        default: 0,
    }
});

const containerSchema = new mongoose.Schema({
    items: [itemSchema],
});

module.exports = mongoose.model('container', containerSchema);