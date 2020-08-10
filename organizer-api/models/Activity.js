const { Schema, model } = require('mongoose');

const activitySchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
});

const Activity = model('Activity', activitySchema);

module.exports = Activity;
