"use strict";
// import { Schema, model } from 'mongoose'
// import { IUser, IUserExistReturn, UserModel } from './auth.interface'
// import config from '../../../config'
// import bcrypt from 'bcrypt'
// const userSchema = new Schema<IUser, UserModel>(
//   {
//     name: {
//       firstName: {
//         type: String,
//         required: true,
//       },
//       lastName: {
//         type: String,
//         required: true,
//       },
//     },
//     profileImage: {
//       type: String,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     phoneNumber: {
//       type: String,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       select: false,
//     },
//     address: {
//       street: {
//         type: String,
//         required: true,
//       },
//       city: {
//         type: String,
//         required: true,
//       },
//       district: {
//         type: String,
//         required: true,
//       },
//       division: {
//         type: String,
//         required: true,
//       },
//       postal: {
//         type: String,
//         required: true,
//       },
//     },
//   },
//   {
//     timestamps: true,
//   }
// )
// userSchema.statics.isUserExist = async function (
//   email: string
// ): Promise<IUserExistReturn | null> {
//   return await User.findOne({ email }, { _id: 1, email: 1, password: 1 })
// }
// userSchema.statics.isPasswordMatched = async function (
//   givenPassword: string,
//   savedPassword: string
// ): Promise<boolean> {
//   return await bcrypt.compare(givenPassword, savedPassword)
// }
// userSchema.pre('save', async function (next) {
//   this.password = await bcrypt.hash(
//     this.password,
//     Number(config.bycrypt_salt_rounds)
//   )
//   next()
// })
// export const User = model<IUser, UserModel>('User', userSchema)
