import { Router } from 'express';
import MessageController from '../controllers/MessageController';
import { hasToken, verifyToken } from '../middleware/auth';
import ValidateInputs from '../middleware/validateInput';

// destructuring methods
const { send, readOne, getSent, getRecieved, getAll, getUnread, getRead } = MessageController;
const { messageInputValidation } = ValidateInputs;

const router = Router();

// add middleware to verify token
router.use('/', hasToken, verifyToken);

router.post('/', messageInputValidation, send);
router.get('/read/:messageId', readOne);
router.get('/sent', getSent);
router.get('/recieved', getRecieved);
router.get('/', getAll);
router.get('/unread', getUnread);
router.get('/read', getRead);

export default router;