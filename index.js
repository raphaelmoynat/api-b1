const express = require('express');
const app = express();
const port = 8000
const mongoose = require('mongoose')
require('dotenv').config();
console.log(process.env.MONGODB_URI);
const mongdbUri = process.env.MONGODB_URI;

const carsRoutes = require('./routes/cars');
const authRoutes = require('./routes/auth');
const commentRoutes = require('./routes/comment');


mongoose.connect(mongdbUri)
    .then(() => {
        console.log('MongoDB Connected!')
    })
    .catch((err) => {
        console.error(err)
    })

app.use(express.json())
app.use(express.static('public'))


app.use('/cars', carsRoutes);
app.use('/', authRoutes );
app.use('/comments', commentRoutes );



app.listen(port, () => {
    console.log("express is running")
})