import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createCatagory = async (data: Category): Promise<Category | null> => {
  // console.log(user)

  const result = await prisma.category.create({
    data,
  });
  return result;
};
const getCatagories = async (): Promise<Category[]> => {
  // console.log(user)

  const result = await prisma.category.findMany({});
  return result;
};
const getSingleCategory = async (id: string): Promise<Category | null> => {
  // console.log(user)

  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });
  return result;
};
export const CatagoryService = {
  createCatagory,
  getCatagories,
  getSingleCategory,
};
