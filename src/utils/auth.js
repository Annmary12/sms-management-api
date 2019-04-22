import jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
  jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.TOKEN_EXPIRES
  })
};
