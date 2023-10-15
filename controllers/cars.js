const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('cars').find();
    result.toArray().then((cars) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cars);
    });
};

const getSingle = async (req, res) => {
    const carId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('cars').find({ _id: carId });
    result.toArray().then((cars) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cars[0]);
    });
};

const createCar = async (req, res) => {
    const car = {
      brand: req.body.brand,
      model: req.body.model,
      year: req.body.year,
      doors: req.body.doors  
    };
    const response = await mongodb.getDatabase().db().collection('cars').insertOne(car);
    if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
};

const updateCar = async (req, res) => {
    const carId = new ObjectId(req.params.id);
    const car = {
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        doors: req.body.doors  
      };
      const response = await mongodb.getDatabase().db().collection('cars').replaceOne({ _id: carId }, car);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};

const deleteCar = async (req, res) => {
    const carId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('cars').deleteOne({ _id: carId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    }
}

module.exports = {
    getAll,
    getSingle,
    createCar,
    updateCar,
    deleteCar
};