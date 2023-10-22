const validator = require('validatejs');
const validate = (body, rules, customMessages, callback) =>{
    const validation = new ValidatorsImpl(body, rules, customMessages, callback);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

module.exports = validate;