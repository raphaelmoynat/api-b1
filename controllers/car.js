const Car = require('../models/Car');

async function index(req, res) {
    const cars = await Car.find();
    res.send(cars);
}

async function show(req, res) {
    const car = await Car.findById(req.params.id);
    res.send(car);
}

async function create(req, res) {
    const {...data} = req.body;

    if (!data.name || !data.brand || !data.power) {
        return res.status(400).send('Missing data for create new car');
    }

    const newCar = await Car.create({...data});
    res.status(201).send({ message: 'New car created successfully' });
}

async function remove(req, res) {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (car) {
        res.send({ message: 'Car deleted successfully' });
    } else {
        res.status(404).send({ error: 'Car not found' });
    }
}

async function update(req, res) {

    const { ...data } = req.body;
    const car = await Car.findByIdAndUpdate(req.params.id, data, { new: true });
    if (car) {
        res.status(201).send({ message: 'Car updated successfully' });
    } else {
        res.status(404).send({ error: 'Car not found' });
    }

}

module.exports = {index, show, create, remove, update};