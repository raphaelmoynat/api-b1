const Car = require('../models/Car');
const Comment = require('../models/Comment');

async function index(req, res) {
    const cars = await Car.find().populate([{
        path: 'comments',
        select: 'content'
    },{
        path:'author',
        select: 'username'
    }]);
    res.send(cars);
}

async function show(req, res) {
    const car = await Car.findById(req.params.id).populate([{
        path: 'comments',
        select: 'content createdAt',
        populate: {
            path: 'author',
            select: 'username'
        }
    },{
        path:'author',
        select: 'username'
    }]);
    res.send(car);

}

async function create(req, res) {
    const {...data} = req.body;

    if (!data.name || !data.brand || !data.power) {
        return res.status(400).send('Missing data for creating new car');
    }
    const authorId = req.userId;
    console.log(authorId);
    const newCar = await Car.create({...data, author: authorId });
    console.log(newCar);
    res.status(201).send({ message: 'New car created successfully', newCar });
}

async function remove(req, res) {
    const userConnected = req.userId;

    const car = await Car.findById(req.params.id)

    if (!car) {
        return res.status(404).send({ error: 'Car not found' });
    }

    console.log("id user connected : "+ userConnected);
    if (car.author.toString() !== userConnected) {
        return res.status(400).send({error:'You\'re not allowed to delete this car'});
    }

    await Comment.deleteMany({ car: req.params.id })
    await Car.findByIdAndDelete(req.params.id);

    res.send({ message: 'Car deleted successfully' });



}

async function update(req, res) {

    const userConnected = req.userId;
    const car = await Car.findById(req.params.id)

    if (!car) {
        return res.status(404).send({ error: 'Car not found' });
    }

    if (car.author.toString() !== userConnected) {
        return res.status(400).send({error:'You\'re not allowed to update this car'});
    }



    const { ...data } = req.body;
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, data, { new: true }).populate([
       {
        path: 'author',
        select: 'username'
    }]);

    res.status(201).send({ message: 'Car updated successfully', updatedCar });

}

module.exports = {index, show, create, remove, update};