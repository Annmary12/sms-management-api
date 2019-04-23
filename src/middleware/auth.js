import jwt from 'jsonwebtoken';

export const hasToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader) {
    req.token = bearerHeader;
    next();
  } else {
    return res.status(401).json({
      message: 'Please, Kindly Signin Again'
    });
  }
}

/**
 * @description verifies token
 *
 * @param {object} req request object
 * @param {object} res reponse object
 *
 * @param {function} next next function
 */
export const verifyToken = (req, res, next) => {
  const secret = process.env.JWT_SECRET_KEY;

  jwt.verify(req.token, secret, (err, authData) => {
    if (err) {
      res.status(401).json({
        message: 'Please, Kindly Signin Again'
      })
    }

    req.user = authData;
  });
  next();
}
