import jwt from 'jsonwebtoken';

/**
 * @description generates token
 * @param {Object} payload
 * @returns token
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.TOKEN_EXPIRES
  })
};
