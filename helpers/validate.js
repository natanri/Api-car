const validator = require('validatejs');

const validate = (body, rules, customMessages, callback) => {
    const validation = validator(body, rules, customMessages);
    
    if (!validation) {
        // Validation failed
        callback(validator.getErrors(), false);
    } else {
        // Validation passed
        callback(null, true);
    }
};

module.exports = validate;