import type { Request, Response, NextFunction } from 'express'
import { ZodType } from 'zod'
import { AppError } from '@/common/exceptions/AppError.js'

export function validate(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      return next(new AppError(result.error.issues[0]?.message ?? 'Invalid input', 400))
    }
    req.body = result.data
    next()
  }
}
