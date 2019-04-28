import { Router } from 'express';
import ContactController from '../controllers/ContactController';
import ValidateInputs from '../middleware/validateInput';
import checkContactExist from '../middleware/checkContact';
import { hasToken, verifyToken } from '../middleware/auth';

// destructuring the methods
const { create, getAll, getOne, deleteUser } = ContactController;
const { contactInputValidation } = ValidateInputs;

const router = Router();

router.post('/', contactInputValidation, checkContactExist, create);


// add middleware to verify token
router.use('/', hasToken, verifyToken);

router.get('/', getAll);
router.get('/:id', getOne);
router.delete('/', deleteUser);

export default router;
