const router = require('express').Router();
router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.send('Welcome, Please Sign In!'); 
});

router.use('/cars', require('./cars'));
router.use('/customers', require('./customers'));
router.use('/locations', require('./locations'));
router.use('/maintenance', require('./maintenance'));
router.use('/salesInfo', require('./salesInfo'));

module.exports = router;