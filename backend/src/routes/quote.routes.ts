import { Router } from 'express';
import { body } from 'express-validator';
import {
  createQuote,
  getAllQuotes,
  getQuoteById,
  updateQuoteStatus,
  deleteQuote,
} from '../controllers/quote.controller';

const router = Router();

const quoteValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('services').isArray({ min: 1 }).withMessage('At least one service is required'),
  body('projectDescription').trim().notEmpty().withMessage('Project description is required'),
];

router.post('/', quoteValidation, createQuote);
router.get('/', getAllQuotes);
router.get('/:id', getQuoteById);
router.patch('/:id/status', updateQuoteStatus);
router.delete('/:id', deleteQuote);

export default router;
