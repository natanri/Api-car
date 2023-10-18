const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['sales']
    const result = await mongodb.getDatabase().db().collection('salesInfo').find();
    result.toArray().then((sales) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(sales);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['sales']
    const saleId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('salesInfo').find({ _id: saleId });
    result.toArray().then((sales) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(sales[0]);
    });
};

const createSale = async (req, res) => {
    //#swagger.tags=['sales']
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
};

const updateSale = async (req, res) => {
    //#swagger.tags=['sales']
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
};

const deleteSale = async (req, res) => {
    //#swagger.tags=['sales']
    const saleId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('salesInfo').deleteOne({ _id: saleId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the sale.');
    }
}

module.exports = {
    getAll,
    getSingle,
    createSale,
    updateSale,
    deleteSale
};