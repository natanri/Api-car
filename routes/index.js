const passport = require('passport');
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

router.get('/login', passport.authenticate('github'), (req, res) => { });

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('./');
    });
});


module.exports = router;