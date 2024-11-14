const Comment = require('../models/Comment')
const Car = require('../models/Car')


async function index(req, res) {
    const comments = await Comment.find().select('-__v').populate({
        path: 'car',
        select: 'name brand'
    });
    res.send(comments);
}


async function show(req, res) {
    const comment = await Comment.findById(req.params.id).select('-__v').populate({
        path: 'car',
        select: 'name brand'
    })
    res.send(comment);
}

async function create(req, res) {
    const { content, car } = req.body;

    if (!content || !car) {
        return res.status(400).send('missing data')
    }

    try {
        const newComment = await Comment.create({ content, car })
        await Car.findByIdAndUpdate(car, { $push: { comments: newComment._id } })


        res.status(201).send({ message: 'comment created successfully', newComment })
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'there is an error, retry' })
    }
}



async function remove(req, res) {
    try {
        const comment = await Comment.findById(req.params.id)
        console.log(comment)
        if (!comment) {
            return res.status(404).send({ error: 'comment not found' })
        }
        await Comment.findByIdAndDelete(req.params.id)

        await Car.findByIdAndUpdate(
            comment.car,
            { $pull: { comments: comment._id } }
        )
        res.send({ message: 'comment deleted successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).send({ error: 'there is an error, retry' })
    }
}


async function update(req, res) {
    const { ...data } = req.body;
    const comment = await Comment.findByIdAndUpdate(req.params.id, data, { new: true }).populate('car')
    if (comment) {
        res.status(201).send({ message: 'Comment updated successfully', comment })
    } else {
        res.status(404).send({ error: 'Comment not found' })
    }
}

module.exports = { index, show, create, remove, update };