const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['locations']
    const result = await mongodb.getDatabase().db().collection('locations').find();
    result.toArray().then((locations) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(locations);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['locations']
    const locationId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('locations').find({ _id: locationId });
    result.toArray().then((locations) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(locations[0]);
    });
};

const createLocation = async (req, res) => {
    //#swagger.tags=['locations']
    const location = {
        store_number: req.body.store_number,
        city: req.body.city,
        phone_number: req.body.phone_number
    };
    const response = await mongodb.getDatabase().db().collection('locations').insertOne(location);
    if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the location.');
    }
};

const updateLocation = async (req, res) => {
    //#swagger.tags=['locations']
    const locationId = new ObjectId(req.params.id);
    const location = {
        store_number: req.body.store_number,
        city: req.body.city,
        phone_number: req.body.phone_number
      };
      const response = await mongodb.getDatabase().db().collection('locations').replaceOne({ _id: locationId }, location);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the location.');
    }
};

const deleteLocation = async (req, res) => {
    //#swagger.tags=['locations']
    const locationId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('locations').deleteOne({ _id: locationId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the location.');
    }
}

module.exports = {
    getAll,
    getSingle,
    createLocation,
    updateLocation,
    deleteLocation
};