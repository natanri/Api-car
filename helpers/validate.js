// const validator = require('express-validator');
// const validation = (body, rules, customMessages, callback) =>{
//     const validation = new ValidatorsImpl(body, rules, customMessages, callback);
//     validation.passes(() => callback(null, true));
//     validation.fails(() => callback(validation.errors, false));
// };

// module.exports = validator;

const { validationResult, body } = require('express-validator');

const validate = (validationRules) => {
    return [
        // Define your validation rules here using the 'body' method
        // For example:
        body('brand').notEmpty().isString(),
        body('model').notEmpty().isString(),
        body('year').notEmpty().isInt(),
        body('doors').notEmpty().isInt(),
        
        // Handle validation errors
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(412).json({
                    success: false,
                    message: 'Validation failed',
                    errors: errors.array(),
                });
            }
            next();
        }
    ];
};

module.exports = validate;
