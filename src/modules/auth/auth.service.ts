import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '@/config/database.js'
import { env } from '@/config/env.js'
import { AppError } from '@/common/exceptions/AppError.js'

export const authService = {
  register: async (name: string, email: string, password: string) => {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      throw new AppError('Email already registered', 409)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    })

    return { id: user.id, name: user.name, email: user.email }
  },

  login: async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      throw new AppError('Invalid email or password', 401)
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      throw new AppError('Invalid email or password', 401)
    }

    const token = jwt.sign({ userId: user.id }, env.jwtSecret as string, { expiresIn: '1h' })

    return { token }
  },
}
