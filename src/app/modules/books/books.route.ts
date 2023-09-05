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
router.get('/:id', BookController.getSingleBook);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.updateSingleBook
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.deleteSingleBook
);
router.get('/', BookController.getAllBooks);
