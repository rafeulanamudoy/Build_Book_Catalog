import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './categories.controller';
import { CategoryValidation } from './categories.validation';

const router = express.Router();

export const CategoryRoute = router;

router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.CreateCategorySchema),

  CategoryController.createCatagory
);

router.get('/:id', CategoryController.getSingleCategory);
router.patch('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

router.get('/', CategoryController.getCatagories);
