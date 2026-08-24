import type { Request, Response, NextFunction } from 'express'
import { userService } from '@/modules/user/user.service.js'

export async function getUsers(req: Request, res: Response) {
  const users = await userService.getUsers()
  res.json(users)
}

export async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userService.getUserById(Number(req.params.id))
    res.json(user)
  } catch (err) {
    next(err)
  }
}

export async function createUser(req: Request, res: Response) {
  const newUser = await userService.createUser(req.body.name)
  res.status(201).json(newUser)
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userService.updateUser(Number(req.params.id), req.body.name)
    res.json(user)
  } catch (err) {
    next(err)
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    await userService.deleteUser(Number(req.params.id))
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
