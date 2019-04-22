import Contact from '../models/contact';
import BaseRepository from '../repository/BaseRepository';

/**
 * @description checks if contact exist
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next middleware next
 *
 * @returns {json} returns error if contact exist
 */
const checkContactExist = async (req, res, next) => {
  const { phoneNumber } = req.body;

  const contact = await BaseRepository.findByField(Contact, 'phoneNumber', phoneNumber);

  return contact.length
  ? res.status(401).json({error: 'phone number is existing'})
  : next();
}

export default checkContactExist;
