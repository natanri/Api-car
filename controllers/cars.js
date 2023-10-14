const mongodb = require('../data/database');
// const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger-tags=['Cars']
    console.log(mongodb);
    console.log("it worked");
    const result = await mongodb.getDatabase().db().collection('cars').find();
    console.log(result);
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cars);
    });
}

module.exports = {
    getAll
};
