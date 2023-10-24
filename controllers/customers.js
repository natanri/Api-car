const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags['Customers']
    try {
        const result = await mongodb.getDatabase().db().collection('customers').find();
        const customers = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(customers);
    } catch (error) {
        console.error('Error in getAll:', error);
        res.status(500).json('Internal server error');
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags['Customers']
    try {
        const customerId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('customers').find({ _id: customerId });
        const customers = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(customers[0]);
    } catch (error) {
        console.error('Error in getSingle:', error);
        res.status(500).json('Internal server error');
    }
};

const createCustomer = async (req, res) => {
    //#swagger.tags['Customers']
    try {
        const customer = {
            fName: req.body.fName,
            lName: req.body.lName,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            dob: req.body.dob,
            address: req.body.address,
            city: req.body.city,
            phone: req.body.phone,
            storeNum: req.body.storeNum 
        };
        const response = await mongodb.getDatabase().db().collection('customers').insertOne(customer);
        if (response.acknowledged > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the customer.');
        }
    } catch (error) {
        console.error('Error in createCustomer:', error);
        res.status(500).json('Internal server error');
    }
};

const updateCustomer = async (req, res) => {
    //#swagger.tags['Customers']
    try {
        const customerId = new ObjectId(req.params.id);
        const customer = {
            fName: req.body.fName,
            lName: req.body.lName,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            dob: req.body.dob,
            address: req.body.address,
            city: req.body.city,
            phone: req.body.phone,
            storeNum: req.body.storeNum 
        };
        const response = await mongodb.getDatabase().db().collection('customers').replaceOne({ _id: customerId }, customer);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the customer.');
        }
    } catch (error) {
        console.error('Error in updateCustomer:', error);
        res.status(500).json('Internal server error');
    }
};

const deleteCustomer = async (req, res) => {
    //#swagger.tags['Customers']
    try {
        const customerId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('customers').deleteOne({ _id: customerId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the customer.');
        }
    } catch (error) {
        console.error('Error in deleteCustomer:', error);
        res.status(500).json('Internal server error');
    }
};

module.exports = {
    getAll,
    getSingle,
    createCustomer,
    updateCustomer,
    deleteCustomer
};
