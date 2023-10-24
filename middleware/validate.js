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

const saveCustomer = async (req, res, next) => {
  const validationRule = {
    "fName": 'required|string',
    "lName": 'required|string',
    "username": 'required|string',
    "password": 'required|string',
    "email": 'required|email',
    "dob": 'required|string',
    "address": 'required|string',
    "city": 'required|string',
    "phone": 'required|string',
    "storeNum": 'required|numeric'  
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

const saveLocation = async (req, res, next) => {
  const validationRule = {
    "store_number": 'required|numeric',
    "city": 'required|string',
    "phone_number": 'required|string'
      
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

const saveMaintenance = async (req, res, next) => {
  const validationRule = {
    'type': 'required|string',
    'sched_date': 'required|string',
    'store_num': 'required|numeric',
    'customer_name': 'required|string'  
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

const saveSale = async (req, res, next) => {
  const validationRule = {
    "order_num": 'required|numeric',
    "customer": 'required|string' 
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
  saveCar,
  saveCustomer,
  saveLocation,
  saveMaintenance,
  saveSale
};
