import { z } from 'zod';

import { isValidEmail } from '../utils/emailValidation';

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .refine(
        (value) =>
          value[0] ===
          value[0]?.toUpperCase(),
        {
          message:
            'First letter must be uppercase',
        },
      ),

    age: z.coerce
      .number()
      .min(
        0,
        'Age cannot be negative',
      ),

    email: z
      .string()
      .refine(isValidEmail, {
        message: 'Invalid email',
      }),

    gender: z.string().min(
      1,
      'Select gender',
    ),

    country: z.string().min(
      1,
      'Select country',
    ),

    password: z.string().min(
      1,
      'Password is required',
    ),

    confirmPassword: z.string().min(
      1,
      'Confirm password',
    ),
  })
  .superRefine((data, ctx) => {
    if (
      data.password !==
      data.confirmPassword
    ) {
      ctx.addIssue({
        code:
          z.ZodIssueCode.custom,

        path: [
          'confirmPassword',
        ],

        message:
          'Passwords do not match',
      });
    }
  });

export type FormData = z.infer<
  typeof formSchema
>;