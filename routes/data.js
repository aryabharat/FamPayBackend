const express = require('express');
const router = express.Router();
const Video = require('./../model/videos')


router.get('/', async (req, res) => {
    try {
        // let result = await Video.find().sort({ publish_time: -1 });
        let results = await paginatedResults(Video, {}, req);
        res.status(200).json(results);
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: true, status: 500, msg: err })
    }
});


router.get('/search', async (req, res) => {
    try {

        let { keywords } = req.query;

        const keywordsRegex = new RegExp(keywords.replace(' ', '|'))

        let filter = {
            $or:
                [
                    { title: { $regex: keywordsRegex, $options: 'i' } },
                    { description: { $regex: keywordsRegex, $options: 'i' } }
                ]
        }

        let results = await paginatedResults(Video, filter, req);
        res.status(200).json(results);
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: true, status: 500, msg: err })
    }
});
module.exports = router;


//helper
async function paginatedResults(model, filter, req) {

    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)


    // console.log(isNaN(page))
    if (isNaN(page) || isNaN(limit)) {
        page = 1;
        limit = 10;
    }
    // console.log({ page, limit })

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    if (endIndex < await model.countDocuments(filter).exec()) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }
    try {
        results.results = await model.find(filter).limit(limit).skip(startIndex).sort({ publish_time: -1 }).exec()
        let paginatedResults = results
        return paginatedResults;
    } catch (e) {
        console.log(e.message);
        throw e;
    }
}