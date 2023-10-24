const validator = require('../helpers/validate');

const saveCar = async (req, res, next) => {
    const validationRule = {
        "brand": 'required|string',
        "model": 'required|string',
        "year": 'required|numeric',
        "doors": 'required|string'
        
    };

    try {
      await new Promise((resolve, reject) => {
        validator(req.body, validationRule, {}, (err, status) => {
          if (!status) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
      next();
    } catch (error) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: error,
      });
    }
};


module.exports = {
    saveCar
};
