const express = require('express');
const app = express();
const port = 8000
const mongoose = require('mongoose')
require('dotenv').config();
console.log(process.env.MONGODB_URI);
const mongdbUri = process.env.MONGODB_URI;

const carsRoutes = require('./routes/cars');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware');


mongoose.connect(mongdbUri)
    .then(() => {
        console.log('MongoDB Connected!')
    })
    .catch((err) => {
        console.error(err)
    })

app.use(express.json())
app.use(express.static('public'))


app.use('/cars', authMiddleware, carsRoutes);
app.use('/', authRoutes );

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('documentation');
});

app.listen(port, () => {
    console.log("express is running")
})