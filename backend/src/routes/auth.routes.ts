import { Router } from 'express';
import { register, login, getAllCustomers } from '../controllers/auth.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/customers', getAllCustomers);

export default router;
