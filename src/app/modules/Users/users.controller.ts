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

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await UserService.getSingleUser(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'User getched successfully',
    data: data,
  });
});

const deleteSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await UserService.deleteSingleUser(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Users deleted successfully',
    data: data,
  });
});
const updateSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedInfo = req.body;
  const data = await UserService.updateSingleUser(id, updatedInfo);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Users Updated  successfully',
    data: data,
  });
});
export const UserController = {
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
};
