import { Router } from 'express';
import contactRoutes from './contact';
import messageRoutes from './message';

const route = Router();

route.get('/', (req, res) => {
  res.json({message: 'Welcome to SMS Management API!!!'});
})

route.use('/contacts', contactRoutes);
route.use('/sms', messageRoutes);

export default route;
