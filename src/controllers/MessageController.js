import Message from '../models/message';
import Contact from '../models/contact';
import BaseRepository from '../repository/BaseRepository';

/**
 * @description Message Controller
 * @class MessageController
 */
class MessageController {
  /**
   * @description send message to a contact
   *
   * @param {req} req  equest object
   * @param {res} res response object
   *
   * @returns {json} returns json with message and status of the message
   */
  static async send(req, res) {
    try {
      const sender = req.user;
      const { phoneNumber, message } = req.body;
      const receiver = await BaseRepository.findOneByField(Contact, 'phoneNumber', phoneNumber);

      if (!receiver)
        return res.status(404).json({ message: 'Contact not found!' });

      if (sender._id == receiver._id)
        return res.status(400).json({message: 'You can\'t send a message to your self'});

      const options = {
        message,
        receiverId: receiver._id,
        senderId: sender._id,
      }
      await BaseRepository.create(Message, options);

      res.status(200).json({
        message: 'message sent successfully',
      })
    } catch (error) {
      res.status(500).json({error});
    }
  }

  /**
   * @description reads one message
   *
   * @param {object} req  request object
   * @param {object} res response object
   *
   * @returns {json} returns json with message and status of the message
   */
  static async readOne(req, res) {
    try {
      const { messageId } = req.params;
      const user = req.user;
      const message = await BaseRepository.findById(Message, messageId);

      if (!message || user._id != message.receiverId)
        return res.status(404).json({ message: 'Message not found!' });

      if (message.read == 'true')
        return res.status(200).json({ message })

      const updatedMessage = await BaseRepository.update(Message, message._id, { read: true });

      res.status(200).json({
        updatedMessage
      });

    } catch (error) {
      res.status(500).json({error});
    }
  }

  /**
   * @description get all sent messages
   *
   * @param {object} req request object
   * @param {object} res response object
   *
   * @returns {json} returns json with message and status of the message
   */
  static async getSent(req, res) {
    try {
      const user = req.user;
      const messages = await BaseRepository.findByField(Message, 'senderId', user._id);

      if (messages.length <= 0)
        return res.status(404).json({ message: 'Message not found!'});

      res.status(200).json({
        messages
      });
    } catch (error) {
      res.status(500).json({error});
    }
  }

  /**
   * @description gets all received message/s
   *
   * @param {object} req request object
   * @param {*} res response object
   *
   * @returns {json} returns json with message and status of the message
   */
  static async getRecieved(req, res) {
    try {
      const user = req.user;
      const messages = await BaseRepository.findByField(Message, 'receiverId', user._id);

      if (messages.length <= 0)
        return res.status(404).json({ message: 'Message not found!'});

      res.status(200).json({
        messages
      });
    } catch (error) {
      res.status(500).json({error});
    }
  }

  /**
   * @description gets all unread message/s
   *
   * @param {object} req request object
   * @param {*} res response object
   *
   * @returns {json} returns json with message and status of the message
   */
  static async getUnread(req, res) {
    try {
      const user = req.user;
      const options = {
        page: req.query.page ? Number(req.query.page) : 1,
        limit: 10
      };
      const query = {
        receiverId: user._id,
        status: false
      };
      const messages = await BaseRepository.findAll(Message, query, options);

      if (messages.length <= 0)
        return res.status(404).json({ message: 'Message not found!'});

      res.status(200).json({
        messages
      });
    } catch (error) {
      res.status(500).json({error});
    }
  }

  /**
   * @description gets all sent and recieved messages for a user
   *
   * @param {object} req request object
   * @param {object} res  response object
   *
   * @returns {json} returns status code and message.
   */
  static async getAll(req, res) {
    try {
      const user = req.user;
      const options = {
        page: req.query.page ? Number(req.query.page) : 1,
        limit: 10
      };
      const query = {
        receiverId: user._id,
        senderId: user._id
      };
      const messages = await BaseRepository.findAll(Message, query, options);

      if (messages.length <= 0)
        return res.status(404).json({ message: 'Message not found!'});

      res.status(200).json({
        messages
      });
    } catch (error) {
      res.status(500).json({error});
    }
  }
}

export default MessageController;
