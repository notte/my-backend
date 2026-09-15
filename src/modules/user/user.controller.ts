import type { Request, Response } from 'express'
import type { AuthRequest } from '@/middlewares/auth.middleware.js'
import { userService } from '@/modules/user/user.service.js'

export async function getUsers(req: Request, res: Response) {
  const users = await userService.getUsers()
  res.json(users)
}

export async function getUserById(req: Request, res: Response) {
  const user = await userService.getUserById(Number(req.params.id))
  res.json(user)
}

export async function updateUser(req: AuthRequest, res: Response) {
  const user = await userService.updateUser(
    Number(req.params.id),
    req.body.name,
    req.userId!,
    req.role!,
  )
  res.json(user)
}

export async function deleteUser(req: AuthRequest, res: Response) {
  await userService.deleteUser(Number(req.params.id), req.userId!, req.role!)
  res.status(204).send()
}
