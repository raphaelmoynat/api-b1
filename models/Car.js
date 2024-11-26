const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    name :{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    brand :{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    power :{
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    comments: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Comment',
        },
    ],
    author:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    }
})

module.exports = mongoose.model('Car', CarSchema);