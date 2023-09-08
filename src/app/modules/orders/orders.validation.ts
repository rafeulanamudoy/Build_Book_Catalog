import { z } from 'zod';
const orderedBookSchema = z.object({
  bookId: z.string(),
  quantity: z.number().int(),
});
const createOrder = z.object({
  body: z.object({
    orderedBooks: z.array(orderedBookSchema, z.unknown()).min(1, {
      message: 'orderedBooks is Required',
    }),
  }),
});

export const OrderValidation = {
  createOrder,
};
