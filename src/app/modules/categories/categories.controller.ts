import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CatagoryService } from './categories.service';

const createCatagory = catchAsync(async (req: Request, res: Response) => {
  const category = req.body;
  // console.log(category);
  const result = await CatagoryService.createCatagory(category);
  // eslint-disable-next-line no-unused-vars

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Category created successfully',
    data: result,
  });
});

export const CategoryController = {
  createCatagory,
};
