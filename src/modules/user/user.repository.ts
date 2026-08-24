import { prisma } from '@/config/database.js'

export const userRepository = {
  findMany: () => prisma.user.findMany(),
  findById: (id: number) => prisma.user.findUnique({ where: { id } }),
  create: (name: string) => prisma.user.create({ data: { name } }),
  update: (id: number, name: string) => prisma.user.update({ where: { id }, data: { name } }),
  delete: (id: number) => prisma.user.delete({ where: { id } }),
}
