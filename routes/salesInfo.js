const express = require('express');
const router = express.Router();

const salesController = require('../controllers/salesInfo');
const validation = require('../middleware/validate')
const { isAuthenticated } = require("../middleware/authenticate");


router.get('/', salesController.getAll);

router.get('/:id', salesController.getSingle);

router.post('/', isAuthenticated, saveSale, salesController.createSale);

router.put('/:id', isAuthenticated, saveSale, salesController.updateSale);

router.delete('/:id', isAuthenticated, salesController.deleteSale);

module.exports = router;