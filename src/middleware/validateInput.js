import ErrorHandler from '../utils/errorHandler';

const ValidateInputs = {
  contactInputValidation: (req, res, next) => {
    req.checkBody('name', 'name is required').trim().notEmpty();
    req.checkBody('phoneNumber', 'phone number is required').trim().notEmpty();
    req.checkBody('phoneNumber', 'phone number must be an integer').isNumeric();
    req.checkBody('phoneNumber', 'phone nunmber must not exceed 12 digits').isLength({ min: 12, max: 12 });

    ErrorHandler(req, res, next)
  }
}

export default ValidateInputs;
