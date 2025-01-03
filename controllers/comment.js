const Comment = require('../models/Comment')
const Car = require('../models/Car')


async function index(req, res) {
    const comments = await Comment.find().populate([{
        path: 'car',
        select: 'name brand'
    },{
        path: 'author',
        select: 'username'
    }]);
    res.send(comments);
}


async function show(req, res) {
    const comment = await Comment.findById(req.params.id).populate([{
        path: 'car',
        select: 'name brand'
    },{
        path: 'author',
        select: 'username'
    }]);
    res.send(comment);
}

async function create(req, res) {
    const { content, car } = req.body;

    if (!content || !car) {
        return res.status(400).send('missing data')
    }
    const authorId = req.userId;
    console.log(authorId);


    try {
        const newComment = await Comment.create({ content, car, author: authorId })
        await Car.findByIdAndUpdate(car, { $push: { comments: newComment._id } })


        res.status(201).send({ message: 'comment created successfully', newComment })
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'there is an error, retry' })
    }
}



async function remove(req, res) {

    const userConnected = req.userId;
    try {
        const comment = await Comment.findById(req.params.id)
        console.log(comment)
        if (!comment) {
            return res.status(404).send({ error: 'comment not found' })
        }
        if (comment.author.toString() !== userConnected) {
            return res.status(400).send({error:'You\'re not allowed to delete this comment'});
        }
        await Comment.findByIdAndDelete(req.params.id)

        await Car.findByIdAndUpdate(
            comment.car,
            { $pull: { comments: comment._id } }
        )
        res.send({ message: 'Comment deleted successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).send({ error: 'there is an error, retry' })
    }
}


async function update(req, res) {
    const userConnected = req.userId;
    const { ...data } = req.body;
    const comment = await Comment.findById(req.params.id)
    if (comment.author.toString() !== userConnected) {
        return res.status(400).send({error:'You\'re not allowed to update this comment'});
    }
    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, data, { new: true }).populate([{
        path: 'car',
        select: 'name brand'
    },{
        path: 'author',
        select: 'username'
    }])
    if (comment) {
        res.status(201).send({ message: 'Comment updated successfully', updatedComment })
    } else {
        res.status(404).send({ error: 'Comment not found' })
    }
}

module.exports = { index, show, create, remove, update };