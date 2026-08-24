import type { Request, Response, NextFunction } from 'express'
import { AppError } from '@/common/exceptions/AppError.js'

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message })
    return
  }
  console.error(err.message)
  res.status(500).json({ message: 'Internal server error' })
}
