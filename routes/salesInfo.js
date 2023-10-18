const express = require('express');
const router = express.Router();

const salesController = require('../controllers/salesInfo');

router.get('/', salesController.getAll);

router.get('/:id', salesController.getSingle);

router.post('/',salesController.createSale);

router.put('/:id', salesController.updateSale);

router.delete('/:id', salesController.deleteSale);

module.exports = router;