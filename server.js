require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const PORT = process.env.PORT || 3000;
const app = express();
const data = require('./routes/data')


app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
let { getDataAndStore } = require('./get_and_store_data')
app.use(express.json())
app.use(cors());


app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
// app.use(cors());


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async (result) => {
        console.log("CONNECTED TO MONGODB")
        app.listen(PORT, () => { console.log(`listing to port ${PORT}`) })
        //getDataAndStore();
    })
    .catch(err => console.log(err))

app.use('/api/data', data)




