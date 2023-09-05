import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './books.controller';
import { BooksValidation } from './books.validation';
const router = express.Router();
export const BookRoute = router;

router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),

  validateRequest(BooksValidation.createBookSchema),

  BookController.createBooks
);
router.get('/:categoryId/category', BookController.getBookByCategory);
router.get('/', BookController.getAllBooks);
