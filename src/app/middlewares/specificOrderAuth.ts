import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import prisma from '../../shared/prisma';

const specificOrderAuth =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }
      // verify token
      let verifiedUser: JwtPayload;

      // eslint-disable-next-line prefer-const
      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

      req.user = verifiedUser; // role  , _id
      console.log(verifiedUser, 'from specifictauth');

      const id = req.params.orderId;
      console.log(id, 'from specific auth');

      const order = await prisma.orderModel.findUnique({
        where: {
          id,
        },
      });

      if (
        verifiedUser.role === 'customer' &&
        order?.userId !== verifiedUser.id
      ) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          'you are forbidden to get this order'
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default specificOrderAuth;
