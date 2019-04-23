import jwt from 'jsonwebtoken';

const hasToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader) {
    req.token = bearerHeader;
    next();
  }
  return res.status(401).json({
    message: 'Please, Kindly Signin Again'
  });
}

/**
 * @description verifies token
 *
 * @param {object} req request object
 * @param {object} res reponse object
 *
 * @param {function} next next function
 */
const verifyToken = (req, res, next) => {
  const secret = process.env.JWT_SECRET_KEY;
  const token = hasToken(req, res, next);

  jwt.verify(token, secret, (err, authData) => {
    if (err) {
      res.status(401).json({
        message: 'Please, Kindly Signin Again'
      })
    }

    req.user = authData;
  });
  next();
}

export default verifyToken;