import httpStatus from 'http-status';

import { Request, Response } from 'express';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IRefreshTokenResponse } from './auth.interface';
import { AuthService } from './auth.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);
  const result = await AuthService.createUser(user);
  // eslint-disable-next-line no-unused-vars
  if (result !== null) {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { password, ...others } = result;
    console.log(result);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,

      message: 'User created successfully',
      data: others,
    });
  }
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  if (result !== null) {
    const { token, refreshToken } = result;

    // console.log(token, 'from controller');
    // console.log(result, 'to check result');

    res.cookie('refreshToken', refreshToken, cookieOptions);
    const decodedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );
    console.log(decodedToken, 'check the decoded token');
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User sign in successfully!',
      token: token,
    });
  }
});
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  console.log('my cookies', req.cookies);
  const result = await AuthService.refreshToken(refreshToken);
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'New access token generated successfully !',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const data = await AuthService.getAllUsers();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Users retrieved successfully',
    data: data,
  });
});
export const AuthController = {
  createUser,
  loginUser,
  refreshToken,
  getAllUsers,
};
