const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customers');
const validation = require('../middleware/validate')
const { isAuthenticated } = require("../middleware/authenticate");


router.get('/', isAuthenticated, customerController.getAll);

router.get('/:id', isAuthenticated, customerController.getSingle);

router.post('/', isAuthenticated, validation.saveCustomer, customerController.createCustomer);

router.put('/:id', isAuthenticated, validation.saveCustomer, customerController.updateCustomer);

router.delete('/:id', isAuthenticated, customerController.deleteCustomer);

module.exports = router;
