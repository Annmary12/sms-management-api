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
