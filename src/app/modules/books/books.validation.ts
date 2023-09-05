import { z } from 'zod';

const createBookSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is Required',
    }),
    author: z.string({
      required_error: 'author is Required',
    }),
    genre: z.string({
      required_error: 'genre is Required',
    }),

    price: z.number({
      required_error: 'price is Required',
    }),
    publicationDate: z.string({
      required_error: 'Date is Required',
    }),
    categoryId: z.string({
      required_error: 'categoryId is Required',
    }),
  }),
});

export const BooksValidation = {
  createBookSchema,
};
