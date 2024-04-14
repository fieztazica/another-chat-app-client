import { z } from 'zod'

export const signInSchema = z.object({
    username: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters.',
    }),
    rememberMe: z.boolean().default(false),
})

export const signUpSchema = z
    .object({
        email: z.string().min(1, 'Email is required').email('Invalid email'),
        username: z.string().min(2, {
            message: 'Username must be at least 2 characters.',
        }),
        password: z.string().min(8, {
            message: 'Password must be at least 8 characters.',
        }),
        confirmPassword: z.string().min(8, {
            message: 'Password must be at least 8 characters.',
        }),
    })
    .refine(({ password, confirmPassword }) => confirmPassword === password, {
        message: 'Passwords did not match',
        path: ['confirmPassword'],
    }) // https://www.freecodecamp.org/news/react-form-validation-zod-react-hook-form/#how-to-integrate-zod-for-schema-validation

export const changePasswordSchema = z
    .object({
        password: z.string().min(8, {
            message: 'Password must be at least 8 characters.',
        }),
        newPassword: z.string().min(8, {
            message: 'Password must be at least 8 characters.',
        }),
        confirmNewPassword: z.string().min(8, {
            message: 'Password must be at least 8 characters.',
        }),
    })
    .refine(
        ({ newPassword, confirmNewPassword }) =>
            newPassword === confirmNewPassword,
        {
            message: 'Passwords did not match',
            path: ['confirmNewPassword'],
        }
    )

export const forgotPasswordSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
})

export const resetPasswordSchema = z
    .object({
        newPassword: z.string().min(8, {
            message: 'Password must be at least 8 characters.',
        }),
        confirmNewPassword: z.string().min(8, {
            message: 'Password must be at least 8 characters.',
        }),
    })
    .refine(
        ({ newPassword, confirmNewPassword }) =>
            newPassword === confirmNewPassword,
        {
            message: 'Passwords did not match',
            path: ['confirmNewPassword'],
        }
    )
