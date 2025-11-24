import { Router } from 'express';
const router = Router();
import { register, login, getMe } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getMe);

export default router;
