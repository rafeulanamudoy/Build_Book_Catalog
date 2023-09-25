"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidation = void 0;
const zod_1 = require("zod");
const CreateCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title is Required',
        }),
    }),
});
exports.CategoryValidation = {
    CreateCategorySchema,
};