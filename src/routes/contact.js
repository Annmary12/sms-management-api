import { Router } from 'express';
import ContactController from '../controllers/ContactController';

// destructuring the methods
const { create } = ContactController;

const router = Router();

router.post('/', create);

export default router;
