const express = require('express');
const router = express.Router();

const locationsController = require('../controllers/locations');
const validation = require('../middleware/validate')
const { isAuthenticated } = require("../middleware/authenticate");


router.get('/', locationsController.getAll);

router.get('/:id', locationsController.getSingle);

router.post('/', isAuthenticated, validation.saveLocation, locationsController.createLocation);

router.put('/:id', isAuthenticated, validation.saveLocation, locationsController.updateLocation);

router.delete('/:id', isAuthenticated, locationsController.deleteLocation);

module.exports = router;