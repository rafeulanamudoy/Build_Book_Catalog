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
const updateCategory = async (
  id: string,
  data: Partial<Category>
): Promise<Category | null> => {
  // console.log(user)

  const result = await prisma.category.update({
    where: {
      id,
    },
    data: data,
  });
  return result;
};
const deleteCategory = async (id: string): Promise<Category | null> => {
  // console.log(user)

  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};
export const CatagoryService = {
  createCatagory,
  getCatagories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
