import { Router } from 'express';
import ContactController from '../controllers/ContactController';
import ValidateInputs from '../middleware/validateInput';

// destructuring the methods
const { create } = ContactController;
const { contactInputValidation } = ValidateInputs;

const router = Router();

router.post('/', contactInputValidation, create);

export default router;
