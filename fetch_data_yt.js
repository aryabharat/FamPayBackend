const { request } = require('express')
const googleapis = require('googleapis')
const Video = require('./model/videos')
let key = process.env.API_KEY.split(',');


const params = {
    part: ['snippet'],
    maxResults: 15,
    order: 'date',
    type: ['video'],
    publishedAfter: '2020-01-01T00:00:00Z',
    q: process.env.YT_SEARCH_QUERY
}


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

}

async function getDataAndStore() {

    setInterval(() => {
        getData()
            .then(data => {
                // console.dir(JSON.parse(JSON.stringify(data.data.items[0])))
                //console.log(data.data.item[0])
                storeData(data);
            })
            .catch(err => {
                console.log(err.message)
                console.log('changin keys')
                key.shift();
            });
    }, 10000);
}

function getGapiObj() {
    
    // console.log(key.shift())
    let gapi = new googleapis.youtube_v3.Youtube({
        auth: key[0]
    })
    return gapi
}

module.exports = { getDataAndStore }
// AIzaSyDi0Ec_RulEq-HGjaVkgfqrll94vue2QV8