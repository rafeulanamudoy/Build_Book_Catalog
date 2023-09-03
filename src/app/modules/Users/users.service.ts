import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getAllUsers = async (): Promise<User[]> => {
  const result = await prisma.user.findMany({});
  return result;
};
export const UserService = {
  getAllUsers,
};
