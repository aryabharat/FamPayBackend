const express = require('express');
const router = express.Router();
const Video = require('./../model/videos')


router.get('/', async (req, res) => {
    try {
        let result = await Video.find().sort({ publish_time: -1 });
        res.status(200).json(result);
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: true, status: 500, msg: err })
    }
});

module.exports = router;