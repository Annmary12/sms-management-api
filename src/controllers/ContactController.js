import Contact from '../models/contact';
import BaseRepository from '../repository/BaseRepository';
import { generateToken } from '../utils/auth';

/**
 * @description ContactController
 * @class ContactController
 */
class ContactController {
  /**
   * @description creates new contact
   *
   * @param {Object} req request object
   * @param {Object} res response object
   *
   * @returns {json} status code, message and newly created contact
   */
  static async create(req, res) {
    try {
      const { name, phoneNumber } = req.body;
      const options = { name, phoneNumber };
      const data = await BaseRepository.create(Contact, options);
      const token = await generateToken({_id :data._id, name: data.name});

      return  res.status(201).json({data, token});
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  /**
   * @description  get all contact
   *
   * @param {object} req request object
   * @param {object} res response object
   *
   * @returns {json} status code, message and newly created contact
   */
  static async getAll(req, res) {
    try {
      const data = await BaseRepository.findAll(Contact);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default ContactController;