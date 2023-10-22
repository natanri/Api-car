const validate = require('../helpers/validate');

const saveCar = (req, res, next) => {
    const validationRule = {
        "brand": 'required|string',
        "model": 'required|string',
        "year": 'required|numeric',
        "doors": 'required|string'
        
    };
    validate(req.body, validationRule, {}, (err, status) => { // Change 'validator' to 'validate'
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err                
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveCar
};
