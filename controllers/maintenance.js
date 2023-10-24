const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags['Maintenance']
    try {
        const result = await mongodb.getDatabase().db().collection('maintenance').find();
        const maintenances = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(maintenances);
    } catch (error) {
        console.error('Error in getAll:', error);
        res.status(500).json('Internal server error');
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags['Maintenance']
    try {
        const maintenanceId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('maintenance').find({ _id: maintenanceId });
        const maintenances = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(maintenances[0]);
    } catch (error) {
        console.error('Error in getSingle:', error);
        res.status(500).json('Internal server error');
    }
};

const createMaintenance = async (req, res) => {
    //#swagger.tags['Maintenance']
    try {
        const maintenance = {
            type: req.body.type,
            sched_date: req.body.sched_date,
            store_num: req.body.store_num,
            customer_name: req.body.customer_name  
        };
        const response = await mongodb.getDatabase().db().collection('maintenance').insertOne(maintenance);
        if (response.acknowledged > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the maintenance.');
        }
    } catch (error) {
        console.error('Error in createMaintenance:', error);
        res.status(500).json('Internal server error');
    }
};

const updateMaintenance = async (req, res) => {
    //#swagger.tags['Maintenance']
    try {
        const maintenanceId = new ObjectId(req.params.id);
        const maintenance = {
            type: req.body.type,
            sched_date: req.body.sched_date,
            store_num: req.body.store_num,
            customer_name: req.body.customer_name
        };
        const response = await mongodb.getDatabase().db().collection('maintenance').replaceOne({ _id: maintenanceId }, maintenance);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the maintenance.');
        }
    } catch (error) {
        console.error('Error in updateMaintenance:', error);
        res.status(500).json('Internal server error');
    }
};

const deleteMaintenance = async (req, res) => {
    //#swagger.tags['Maintenance']
    try {
        const maintenanceId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('maintenance').deleteOne({ _id: maintenanceId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the maintenance.');
        }
    } catch (error) {
        console.error('Error in deleteMaintenance:', error);
        res.status(500).json('Internal server error');
    }
};

module.exports = {
    getAll,
    getSingle,
    createMaintenance,
    updateMaintenance,
    deleteMaintenance
};
