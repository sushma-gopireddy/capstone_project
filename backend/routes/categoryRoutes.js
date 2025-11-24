import { Router } from 'express';
const router = Router();
import { getCategories, createCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';

router.get('/', getCategories);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
