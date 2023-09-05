import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
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

export const BookController = {
  createBooks,
};
