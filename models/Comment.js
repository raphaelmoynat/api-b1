const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    car: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Car',
        required: true,
    },
    author:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    }
});

module.exports = mongoose.model('Comment', CommentSchema);