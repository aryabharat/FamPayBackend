const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    video_id: {
        type: String,
        unique: true,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    thumbnail: {
        type: String,
        unique: true,
    },
    channel_id: {
        type: String,
    },
    channel_title: {
        type: String,
    },
    publish_time: {
        type: Date,
    }
})


module.exports = mongoose.model('video', videoSchema);