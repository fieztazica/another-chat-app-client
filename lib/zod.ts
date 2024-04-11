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
    .superRefine(({ password, confirmPassword }, ctx) => {
        // https://stackoverflow.com/a/73697538/14660191
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: 'custom',
                message: 'The passwords did not match',
            })
        }
    })
