// const validator = require('express-validator');
// const validation = (body, rules, customMessages, callback) =>{
//     const validation = new ValidatorsImpl(body, rules, customMessages, callback);
//     validation.passes(() => callback(null, true));
//     validation.fails(() => callback(validation.errors, false));
// };

// module.exports = validator;

const Validator = require('validatorjs');
const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages, callback);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors,false));
};

module.exports = validator;