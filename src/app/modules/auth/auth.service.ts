import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import isUserExist from '../../../helpers/isUserExist';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import hashPassword from '../../../helpers/passwordHash';
import isPasswordMatched from '../../../helpers/passwordMatch';
import prisma from '../../../shared/prisma';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

const createUser = async (user: User): Promise<User | null> => {
  // console.log(user)
  const modifyUser = await hashPassword(user);
  const result = await prisma.user.create({
    data: modifyUser,
  });
  return result;
};
const loginUser = async (
  payload: ILoginUser
): Promise<ILoginUserResponse | null> => {
  const { email, password } = payload;

  const userExist = await isUserExist(email);

  if (!userExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Doesn,t Exist');
  }
  // console.log(userExist, 'from service file 30 number line');
  if (
    userExist.password &&
    !(await isPasswordMatched(password, userExist.password))
  ) {
    // console.log(
    //   await isPasswordMatched(password, userExist.password),
    //   'to chekc password'
    // );
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }
  const { id, role } = userExist;
  // console.log(userExist, 'from auth service tocheck user');
  const token = jwtHelpers.createToken(
    { id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  return {
    token,
    refreshToken,
  };
};
const refreshToken = async (token: string) => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }
  console.log('decoded token ', verifiedToken);
  const { id } = verifiedToken;

  const isUserExist = await prisma.user.findUnique({
    where: { id },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      email: isUserExist.email,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const getAllUsers = async (): Promise<User[]> => {
  const result = await prisma.user.findMany({});
  return result;
};
export const AuthService = {
  createUser,
  loginUser,
  refreshToken,
  getAllUsers,
};
