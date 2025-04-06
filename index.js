const express = require('express');
const app = express();
const port = 8000
const mongoose = require('mongoose')
require('dotenv').config();
console.log(process.env.MONGODB_URI);
const mongdbUri = process.env.MONGODB_URI;
const cors = require('cors')

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


app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use('/cars', carsRoutes);
app.use('/', authRoutes );
app.use('/comments', commentRoutes );

app.set('views', './views');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log("express is running")
})
