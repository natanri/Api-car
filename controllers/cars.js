const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags['Cars']
    try {
        const result = await mongodb.getDatabase().db().collection('cars').find();
        const cars = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cars);
    } catch (error) {
        console.error('Error in getAll:', error);
        res.status(500).json('Internal server error');
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags['Cars']
    try {
        const carId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('cars').find({ _id: carId });
        const cars = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cars[0]);
    } catch (error) {
        console.error('Error in getSingle:', error);
        res.status(500).json('Internal server error');
    }
};

const createCar = async (req, res) => {
    //#swagger.tags['Cars']
    try {
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
    } catch (error) {
        console.error('Error in createCar:', error);
        res.status(500).json('Internal server error');
    }
};

const updateCar = async (req, res) => {
    //#swagger.tags['Cars']
    try {
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
    } catch (error) {
        console.error('Error in updateCar:', error);
        res.status(500).json('Internal server error');
    }
};

const deleteCar = async (req, res) => {
    //#swagger.tags['Cars']
    try {
        const carId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('cars').deleteOne({ _id: carId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the car.');
        }
    } catch (error) {
        console.error('Error in deleteCar:', error);
        res.status(500).json('Internal server error');
    }
};

module.exports = {
    getAll,
    getSingle,
    createCar,
    updateCar,
    deleteCar
};
