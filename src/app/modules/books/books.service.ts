import { BookModel } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createBooks = async (data: BookModel): Promise<BookModel | null> => {
  // console.log(user)
  data.publicationDate = new Date(data.publicationDate);
  console.log(data);
  const result = await prisma.bookModel.create({
    data,
  });
  return result;
};
export const BookService = {
  createBooks,
};
