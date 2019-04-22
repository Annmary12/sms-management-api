import Contact from '../models/contact';
import BaseRepository from '../repository/BaseRepository';

class ContactController {
  static async create(req, res) {
    try {
      const { name, phoneNumber } = req.body;
      const options = { name, phoneNumber };
      const data = await BaseRepository.create(Contact, options);
     return  res.status(201).json({"data": data});

    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default ContactController;