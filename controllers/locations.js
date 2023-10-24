const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags['locations']
    try {
        const result = await mongodb.getDatabase().db().collection('locations').find();
        const locations = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(locations);
    } catch (error) {
        console.error('Error in getAll:', error);
        res.status(500).json('Internal server error');
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags['locations']
    try {
        const locationId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('locations').find({ _id: locationId });
        const locations = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(locations[0]);
    } catch (error) {
        console.error('Error in getSingle:', error);
        res.status(500).json('Internal server error');
    }
};

const createLocation = async (req, res) => {
    //#swagger.tags['locations']
    try {
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
    } catch (error) {
        console.error('Error in createLocation:', error);
        res.status(500).json('Internal server error');
    }
};

const updateLocation = async (req, res) => {
    //#swagger.tags['locations']
    try {
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
    } catch (error) {
        console.error('Error in updateLocation:', error);
        res.status(500).json('Internal server error');
    }
};

const deleteLocation = async (req, res) => {
    //#swagger.tags['locations']
    try {
        const locationId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('locations').deleteOne({ _id: locationId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the location.');
        }
    } catch (error) {
        console.error('Error in deleteLocation:', error);
        res.status(500).json('Internal server error');
    }
};

module.exports = {
    getAll,
    getSingle,
    createLocation,
    updateLocation,
    deleteLocation
};
