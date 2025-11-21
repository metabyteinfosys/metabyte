import { Router } from 'express';
import { body } from 'express-validator';
import { login, verifyToken, createAdmin } from '../controllers/auth.controller';

const router = Router();

const loginValidation = [
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

const createAdminValidation = [
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').trim().notEmpty().withMessage('Name is required'),
];

router.post('/login', loginValidation, login);
router.get('/verify', verifyToken);
router.post('/create-admin', createAdminValidation, createAdmin);

export default router;
