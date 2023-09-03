import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './users.service';
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const data = await UserService.getAllUsers();
  console.log(req.user, 'user info');
  console.log(req.headers.authorization);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Users retrieved successfully',
    data: data,
  });
});

export const UserController = {
  getAllUsers,
};
