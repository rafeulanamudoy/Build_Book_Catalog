import { UserRole } from '@prisma/client';
import { z } from 'zod';

const signUpZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is Required',
    }),
    email: z
      .string({
        required_error: 'Email is Required',
      })
      .email('this is not a valid email'),
    password: z.string({
      required_error: 'Password is Required',
    }),
    role: z
      .enum([...Object.values(UserRole)] as [string, ...string[]], {})
      .optional(),
    contactNo: z.string({
      required_error: 'contactNo is Required',
    }),

    address: z.string({
      required_error: 'address is Required',
    }),
    profileImg: z.string({
      required_error: 'profileImage is Required',
    }),
  }),
});
const loginZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'email is required',
      })
      .email('this is not a valid email'),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});
export const AuthValidation = {
  signUpZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
};
