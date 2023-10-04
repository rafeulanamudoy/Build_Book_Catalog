// export type IUser = {
//   name: {
//     firsName: string
//     lastName: string
//   }
//   profileImage?: string
//   password: string
//   email: string
//   phoneNumber: string
//   address: {
//     street: string
//     city: string
//     district: string
//     division: string
//     postal: string
//   }
// }

export type IUserExistReturn = {
  id: string;
  role: string;

  password: string;
};
export type ILoginUser = {
  email: string;
  password: string;
};
export type ILoginUserResponse = {
  refreshToken: string;
  token: string;
};
export type IRefreshTokenResponse = {
  accessToken: string;
};
