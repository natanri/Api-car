const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['cars']
    const result = await mongodb.getDatabase().db().collection('cars').find();
    result.toArray().then((cars) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cars);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['cars']
    const carId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('cars').find({ _id: carId });
    result.toArray().then((cars) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cars[0]);
    });
};

const createCar = async (req, res) => {
    //#swagger.tags=['cars']
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
        res.status(500).json(response.error || 'Some error occurred while creating the car.');
    }
};

const updateCar = async (req, res) => {
    //#swagger.tags=['cars']
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
        res.status(500).json(response.error || 'Some error occurred while updating the car.');
    }
};

const deleteCar = async (req, res) => {
    //#swagger.tags=['cars']
    const carId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('cars').deleteOne({ _id: carId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the car.');
    }
}

module.exports = {
    getAll,
    getSingle,
    createCar,
    updateCar,
    deleteCar
};