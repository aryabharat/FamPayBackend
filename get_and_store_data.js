const googleapis = require('googleapis')
const Video = require('./model/videos')

let keys = process.env.API_KEYS.split(',');

const params = require('./config.json')

async function getData() {
    try {
        const gapi = getGapiObj();
        let result = await gapi.search.list(params)
        return result;
    } catch (err) {
        throw err;
    }
}

async function storeData({ data }) {
    try {
        let videosData = [];

        data.items.forEach(e => {
            videosData.push({
                video_id: e.id.videoId,
                title: e.snippet.title,
                description: e.snippet.description,
                thumbnail: e.snippet.thumbnails.high.url,
                channel_id: e.snippet.channelId,
                channel_title: e.snippet.channelTitle,
                publish_time: e.snippet.publishTime
            })
        })

        Video.insertMany(videosData, { ordered: false })
    } catch (err) {
        console.log(err);
    }
}

async function getDataAndStore() {

    setInterval(() => {
        getData()
            .then(data => {
                storeData(data);
            })
            .catch(err => {
                console.log(err.message)
                console.log('changing keyss')
                keys.shift();
            });
    }, 10000);
}

function getGapiObj() {

    // console.log(keys.shift())
    let gapi = new googleapis.youtube_v3.Youtube({
        auth: keys[0]
    })
    return gapi
}

module.exports = { getDataAndStore }