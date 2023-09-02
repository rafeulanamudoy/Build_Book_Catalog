import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createUser = async (user: User): Promise<User | null> => {
  // console.log(user)

  const result = await prisma.user.create({
    data: user,
  });
  return result;
};
// const loginUser = async (
//   payload: ILoginUser
// ): Promise<ILoginUserResponse | null> => {
//   const { email, password } = payload

//   const isUserExist = await User.isUserExist(email)
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User Doesn,t Exist')
//   }

//   if (
//     isUserExist.password &&
//     !(await User.isPasswordMatched(password, isUserExist.password))
//   ) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
//   }
//   const { _id, email: userEmail } = isUserExist
//   const accessToken = jwtHelpers.createToken(
//     { _id, userEmail },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string
//   )
//   const refreshToken = jwtHelpers.createToken(
//     { _id, userEmail },
//     config.jwt.refresh_secret as Secret,
//     config.jwt.refresh_expires_in as string
//   )
//   return {
//     accessToken,
//     refreshToken,
//     email: userEmail,
//   }
// }
// const refreshToken = async (token: string) => {
//   let verifiedToken = null
//   try {
//     verifiedToken = jwtHelpers.verifyToken(
//       token,
//       config.jwt.refresh_secret as Secret
//     )
//   } catch (err) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
//   }
//   console.log('decoded token ', verifiedToken)
//   const { _id } = verifiedToken

//   const isUserExist = await User.findOne({ _id })
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
//   }

//   const newAccessToken = jwtHelpers.createToken(
//     {
//       _id: isUserExist._id,
//       email: isUserExist.email,
//     },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string
//   )

//   return {
//     accessToken: newAccessToken,
//   }
// }
export const UserService = {
  createUser,
  // loginUser,
  // refreshToken,
};
