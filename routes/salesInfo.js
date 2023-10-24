const express = require('express');
const router = express.Router();

const salesController = require('../controllers/salesInfo');
const validation = require('../middleware/validate')
const { isAuthenticated } = require("../middleware/authenticate");


router.get('/', isAuthenticated, salesController.getAll);

router.get('/:id', isAuthenticated, salesController.getSingle);

router.post('/', isAuthenticated, validation.saveSale, salesController.createSale);

router.put('/:id', isAuthenticated, validation.saveSale, salesController.updateSale);

router.delete('/:id', isAuthenticated, salesController.deleteSale);

module.exports = router;