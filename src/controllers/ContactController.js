import Contact from '../models/contact';
import Message from '../models/message';
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
   * @description sign's in a user
   *
   * @param {object} req request object
   * @param {object} res response object
   *
   * @returns {json} status code and message
   */
  static async signIn(req, res) {
    try {
      const { phoneNumber } = req.body;
      const user = await BaseRepository.findOneByField(Contact, 'phoneNumber', phoneNumber);

      if (!user)
        return res.status(400).json({ message: 'contact not found' });

      const token = await generateToken({ _id: user._id, name: user.name });

      return  res.status(201).json({user, token});
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
   * @returns {json} status code, message and all contacts
   */
  static async getAll(req, res) {
    try {
      const options = {
        page: req.query.page ? Number(req.query.page) : 1,
        limit: 10
      }
      const data = await BaseRepository.findAll(Contact, {}, options);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  /**
   * @description get one contact
   *
   * @param {object} req request object
   * @param {object} res response object
   *
   * @returns {json} status code and message
   */
  static async getOne(req, res) {
    try {
      const { id } = req.params;
      const data = await BaseRepository.findById(Contact, id);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: 'contact not found' });
    }
  }

  /**
   * @description deletes a contact
   *
   * @param {object} req  request object
   * @param {object} res response object
   *
   * @returns {json} status code and message
   */
  static async deleteUser(req, res) {
    try {
      const { id } = req.body;
      const checkUserExist = await BaseRepository.findOneByField(Contact, '_id', id);

      if (!checkUserExist)
        return res.status(400).json({ message: 'Contact does not exist'})

        const query = {
          $or: [{receiverId: checkUserExist._id}, {senderId: checkUserExist._id}]
        };

        await BaseRepository.delete(Contact, id);
        await BaseRepository.deleteMany(Message, query);

        res.status(200).json({
          message: 'Contact deleted successfully',
        });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default ContactController;