const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags['Sales']
    try {
        const result = await mongodb.getDatabase().db().collection('salesInfo').find();
        const sales = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(sales);
    } catch (error) {
        console.error('Error in getAll:', error);
        res.status(500).json('Internal server error');
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags['Sales']
    try {
        const saleId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('salesInfo').find({ _id: saleId });
        const sales = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(sales[0]);
    } catch (error) {
        console.error('Error in getSingle:', error);
        res.status(500).json('Internal server error');
    }
};

const createSale = async (req, res) => {
    //#swagger.tags['Sales']
    try {
        const sale = {
            order_num: req.body.order_num,
            customer: req.body.customer 
        };
        const response = await mongodb.getDatabase().db().collection('salesInfo').insertOne(sale);
        if (response.acknowledged > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the sale.');
        }
    } catch (error) {
        console.error('Error in createCar:', error);
        res.status(500).json('Internal server error');
    }
};

const updateSale = async (req, res) => {
    //#swagger.tags['Sales']
    try {
        const saleId = new ObjectId(req.params.id);
        const sale = {
            order_num: req.body.order_num,
            customer: req.body.customer 
        };
        const response = await mongodb.getDatabase().db().collection('salesInfo').replaceOne({ _id: saleId }, sale);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the sale.');
        }
    } catch (error) {
        console.error('Error in updateSale:', error);
        res.status(500).json('Internal server error');
    }
};

const deleteSale = async (req, res) => {
    //#swagger.tags['Sales']
    try {
        const saleId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('salesInfo').deleteOne({ _id: saleId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the sale.');
        }
    } catch (error) {
        console.error('Error in deleteSale:', error);
        res.status(500).json('Internal server error');
    }
};

module.exports = {
    getAll,
    getSingle,
    createSale,
    updateSale,
    deleteSale
};
