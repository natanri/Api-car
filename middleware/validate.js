// const validator = require('../helpers/validate');

// const saveCar = (req, res, next) => {
//     const validationRule = {
//         "brand": 'required|string',
//         "model": 'required|string',
//         "year": 'required|numeric',
//         "doors": 'required|numeric'
        
//     };
//     validator(req.body, validationRule, {}, (err, status) => {
//         if (!status) {
//             res.status(412).send({
//                 success: false,
//                 message: 'Validation failed',
//                 data: err                
//             });
//         } else {
//             next();
//         }
//     });
// };

// module.exports = {
//     saveCar
// };

const validate = require('../helpers/validate');

const saveCar = (req, res, next) => {
    // Define your validation rules
    const validationRules = [
        body('brand').notEmpty().isString(),
        body('model').notEmpty().isString(),
        body('year').notEmpty().isInt(),
        body('doors').notEmpty().isInt(),
    ];

    // Use the 'validate' function to check for validation errors
    validate(validationRules)(req, res, next);
};

module.exports = {
    saveCar
};
