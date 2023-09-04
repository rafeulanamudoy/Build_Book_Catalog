import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createCatagory = async (data: Category): Promise<Category | null> => {
  // console.log(user)

  const result = await prisma.category.create({
    data,
  });
  return result;
};

export const CatagoryService = {
  createCatagory,
};
