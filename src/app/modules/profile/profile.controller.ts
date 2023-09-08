import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

const getProfile = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(400, 'you are not authorized');
  }
  const { id } = req.user;
  const result = await ProfileService.getProfile(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Profile get  successfully',
    data: result,
  });
});

export const ProfileController = {
  getProfile,
};
