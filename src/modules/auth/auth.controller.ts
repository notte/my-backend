import type { Request, Response, NextFunction } from 'express'
import { authService } from '@/modules/auth/auth.service.js'

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body
    const user = await authService.register(name, email, password)
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body
    const result = await authService.login(email, password)
    res.json(result)
  } catch (err) {
    next(err)
  }
}
