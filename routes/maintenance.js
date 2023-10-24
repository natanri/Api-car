const express = require('express');
const router = express.Router();

const maintenanceController = require('../controllers/maintenance');
const validation = require('../middleware/validate')
const { isAuthenticated } = require("../middleware/authenticate");


router.get('/', maintenanceController.getAll);

router.get('/:id', maintenanceController.getSingle);

router.post('/', isAuthenticated, validation.saveMaintenance, maintenanceController.createMaintenance);

router.put('/:id', isAuthenticated, validation.saveMaintenance, maintenanceController.updateMaintenance);

router.delete('/:id', isAuthenticated, maintenanceController.deleteMaintenance);

module.exports = router;