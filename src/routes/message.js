import { Router } from 'express';
import MessageController from '../controllers/MessageController';
import { hasToken, verifyToken } from '../middleware/auth';

// destructuring methods
const { send, readOne, getSent, getRecieved, getAll, getUnread } = MessageController;

const router = Router();

// add middleware to verify token
router.use('/', hasToken, verifyToken);

router.post('/', send);
router.get('/read/:messageId', readOne);
router.get('/sent', getSent);
router.get('/recieved', getRecieved);
router.get('/', getAll);
router.get('/unread', getUnread);

export default router;