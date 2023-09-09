"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksValidation = void 0;
const zod_1 = require("zod");
const createBookSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title is Required',
        }),
        author: zod_1.z.string({
            required_error: 'author is Required',
        }),
        genre: zod_1.z.string({
            required_error: 'genre is Required',
        }),
        price: zod_1.z.number({
            required_error: 'price is Required',
        }),
        publicationDate: zod_1.z.string({
            required_error: 'Date is Required',
        }),
        categoryId: zod_1.z.string({
            required_error: 'categoryId is Required',
        }),
    }),
});
exports.BooksValidation = {
    createBookSchema,
};
