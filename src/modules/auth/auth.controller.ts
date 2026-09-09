import type { Request, Response } from 'express'
import { authService } from '@/modules/auth/auth.service.js'

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body
  const user = await authService.register(name, email, password)
  res.status(201).json(user)
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body
  const result = await authService.login(email, password)
  res.json(result)
}