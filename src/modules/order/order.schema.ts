import { z } from 'zod'

export const createOrderSchema = z.object({
  product: z.string().min(1, 'Product is required'),
})

export const updateOrderSchema = z.object({
  product: z.string().min(1, 'Product is required'),
})
