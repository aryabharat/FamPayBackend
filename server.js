require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const PORT = process.env.PORT || 3000;
const app = express();
const data = require('./routes/data')

let { getDataAndStore } = require('./fetch_data_yt')
app.use(express.json())
app.use(cors());




mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async (result) => {
        console.log("CONNECTED TO MONGODB")
        console.log(`server running @port ${PORT}`)
        getDataAndStore();
    })
    .catch(err => console.log(err))


app.use('/api/data', data);