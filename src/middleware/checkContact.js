import Contact from '../models/contact';
import BaseRepository from '../repository/BaseRepository';

/**
 * @description checks if contact exist
 * @param {object} req request object
 * @param {object} res response object
 * @param {function} next middleware next
 *
 * @returns {json} returns error if contact exist
 */
const checkContactExist = async (req, res, next) => {
  const { phoneNumber } = req.body;

  const contact = await BaseRepository.findByField(Contact, 'phoneNumber', phoneNumber);

  return contact
  ? res.status(401).json({error: 'phone number is already existing'})
  : next();
}

export default checkContactExist;
