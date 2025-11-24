import { Router } from 'express';
const router = Router();
import { getExpenses, createExpense, updateExpense, deleteExpense, getExpenseStats } from '../controllers/expenseController.js';
import auth from '../middleware/auth.js';

router.use(auth); 

router.get('/', getExpenses);
router.post('/', createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);
router.get('/stats', getExpenseStats);

export default router;
