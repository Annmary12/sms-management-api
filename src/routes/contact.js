import { Router } from 'express';
import ContactController from '../controllers/ContactController';
import ValidateInputs from '../middleware/validateInput';
import checkContactExist from '../middleware/checkContact';
// destructuring the methods
const { create } = ContactController;
const { contactInputValidation } = ValidateInputs;

const router = Router();

router.post('/', contactInputValidation, checkContactExist, create);

export default router;
