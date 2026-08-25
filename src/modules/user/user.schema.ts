import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})

export const updateUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})
