import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './orders.service';

import { Secret } from 'jsonwebtoken';
import config from '../../../config';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const { id } = jwtHelpers.verifyToken(
    refreshToken,
    config.jwt.refresh_secret as Secret
  );
  const orderedBooks = req.body;
  console.log();
  const result = await OrderService.createOrder(id, orderedBooks.orderedBooks);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Order Created  successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
};
