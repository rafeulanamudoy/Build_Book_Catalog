import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { BookFilterableFields } from './books.constant';
import { BookService } from './books.service';

const createBooks = catchAsync(async (req: Request, res: Response) => {
  const book = req.body;
  // console.log(category);
  const result = await BookService.createBooks(book);
  // eslint-disable-next-line no-unused-vars

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Book created successfully',
    data: result,
  });
});
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, BookFilterableFields);
  // console.log(
  //   filters,
  //   'i am from controller to check filters',
  //   paginationOptions,
  //   'i am from controller to check paginationOptions'
  // );
  const result = await BookService.getAllBooks(filters, paginationOptions);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Books fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getBookByCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.categoryId;
  const paginationOptions = pick(req.query, paginationFields);

  // console.log(category);
  const result = await BookService.getBookByCategory(id, paginationOptions);
  // eslint-disable-next-line no-unused-vars

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Books with associated category data fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});
export const BookController = {
  createBooks,
  getAllBooks,
  getBookByCategory,
};
