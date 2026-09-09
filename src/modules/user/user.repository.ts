import { prisma } from '@/config/database.js'

// 白名單：明確列出要回傳的欄位，避免 password 等敏感欄位被意外帶出
const safeUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
} as const

export const userRepository = {
  findMany: () => prisma.user.findMany({ select: safeUserSelect }),
  findById: (id: number) => prisma.user.findUnique({ where: { id }, select: safeUserSelect }),
  update: (id: number, name: string) =>
    prisma.user.update({ where: { id }, data: { name }, select: safeUserSelect }),
  delete: (id: number) => prisma.user.delete({ where: { id } }),
}