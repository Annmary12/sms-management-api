import { Router } from 'express';
import { create } from '../controllers/ContactController';

const route = Router();

route.post('/', create);

export default route;
