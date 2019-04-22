/**
 * @description handles errors
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next middleware next
 *
 * @returns {json} returns errors
 */
const ErrorHandler = (req, res, next) => {
  const errors = req.validationErrors();
  if (errors) {
    const getErrors = errors.map(error => error.msg);

    return res.status(400).json({
      errors: getErrors
    });
  }

  return next();
}

export default ErrorHandler;
