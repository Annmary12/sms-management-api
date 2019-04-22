import Contact from '../models/contact';
import BaseRepository from '../repository/BaseRepository';
import { generateToken } from '../utils/auth';

class ContactController {
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
}

export default ContactController;