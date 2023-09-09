"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const signUpZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'name is Required',
        }),
        email: zod_1.z
            .string({
            required_error: 'Email is Required',
        })
            .email('this is not a valid email'),
        password: zod_1.z.string({
            required_error: 'Password is Required',
        }),
        role: zod_1.z
            .enum([...Object.values(client_1.UserRole)], {})
            .optional(),
        contactNo: zod_1.z.string({
            required_error: 'contactNo is Required',
        }),
        address: zod_1.z.string({
            required_error: 'address is Required',
        }),
        profileImg: zod_1.z.string({
            required_error: 'profileImage is Required',
        }),
    }),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: 'email is required',
        })
            .email('this is not a valid email'),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
exports.AuthValidation = {
    signUpZodSchema,
    loginZodSchema,
    refreshTokenZodSchema,
};
