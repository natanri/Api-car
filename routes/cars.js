const express = require('express');
const router = express.Router();

const carController = require('../controllers/cars');
const validation = require('../middleware/validate')
const { isAuthenticated } = require("../middleware/authenticate");


router.get('/', carController.getAll);

router.get('/:id', carController.getSingle);

router.post('/', validation.saveCar,isAuthenticated, carController.createCar);

router.put('/:id',validation.saveCar, isAuthenticated, carController.updateCar);

router.delete('/:id', isAuthenticated, carController.deleteCar);

module.exports = router;