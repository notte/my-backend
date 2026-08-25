import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '@/config/env.js'
import { AppError } from '@/common/exceptions/AppError.js'

export interface AuthRequest extends Request {
  userId?: number
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('No token provided', 401))
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    return next(new AppError('No token provided', 401))
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret as string) as unknown as { userId: number }
    req.userId = payload.userId
    next()
  } catch {
    next(new AppError('Invalid or expired token', 401))
  }
}
