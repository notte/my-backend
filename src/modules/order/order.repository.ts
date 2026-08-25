import { prisma } from '@/config/database.js'

export const orderRepository = {
  findMany: () => prisma.order.findMany(),
  findById: (id: number) => prisma.order.findUnique({ where: { id } }),
  findByUserId: (userId: number) => prisma.order.findMany({ where: { userId } }),
  update: (id: number, product: string) =>
    prisma.order.update({ where: { id }, data: { product } }),
  delete: (id: number) => prisma.order.delete({ where: { id } }),
  create: (product: string, userId: number) => prisma.order.create({ data: { product, userId } }),
}
