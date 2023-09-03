import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getAllUsers = async (): Promise<User[]> => {
  const result = await prisma.user.findMany({});
  return result;
};

const getSingleUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: { id },
  });
  return result;
};
const deleteSingleUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.delete({
    where: { id },
  });
  return result;
};

const updateSingleUser = async (
  id: string,
  data: Partial<User>
): Promise<User | null> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });
  return result;
};
export const UserService = {
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
};
