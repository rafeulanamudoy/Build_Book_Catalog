import { z } from 'zod';

const CreateCategorySchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is Required',
    }),
  }),
});

export const CategoryValidation = {
  CreateCategorySchema,
};
