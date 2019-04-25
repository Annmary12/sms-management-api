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
   * @returns {json} message and status code
   */
  static async send(req, res) {
    try {
      const sender = req.user;
      const { phoneNumber, message } = req.body;
      const receiver = await BaseRepository.findByField(Contact, 'phoneNumber', phoneNumber);

      if (!receiver)
        return res.status(400).json({ message: 'Contact not found' });

      if (sender._id === receiver._id)
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
}

export default MessageController;
