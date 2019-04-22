import Contact from '../models/contact';

class ContactController {
  static async create(req, res) {
    try {
      const { name, phoneNumber } = req.body;
      res.json({"body": req.body});

    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default ContactController;