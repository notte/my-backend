import { orderRepository } from '@/modules/order/order.repository.js'
import { userRepository } from '@/modules/user/user.repository.js'
import { AppError } from '@/common/exceptions/AppError.js'
import { ErrorMessages } from '@/common/constants/errorCodes.js'
import { Prisma } from '@/config/database.js'

export const orderService = {
  getOrders: () => orderRepository.findMany(),

  getOrderById: async (id: number) => {
    const order = await orderRepository.findById(id)
    if (!order) {
      throw new AppError(ErrorMessages.ORDER_NOT_FOUND, 404)
    }
    return order
  },

  getOrdersByUserId: async (userId: number) => {
    return orderRepository.findByUserId(userId)
  },

  createOrder: async (product: string, userId: number) => {
    const user = await userRepository.findById(userId)
    if (!user) {
      throw new AppError(ErrorMessages.USER_NOT_FOUND, 404)
    }
    return orderRepository.create(product, userId)
  },

  updateOrder: async (id: number, userId: number, product: string) => {
    const order = await orderRepository.findById(id)
    if (!order) {
      throw new AppError(ErrorMessages.ORDER_NOT_FOUND, 404)
    }

    const isOwner = order.userId === userId
    if (!isOwner) {
      throw new AppError(ErrorMessages.ORDER_NOT_OWNED_BY_USER, 403)
    }

    try {
      return await orderRepository.update(id, product)
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
        throw new AppError(ErrorMessages.ORDER_NOT_FOUND, 404)
      }
      throw err
    }
  },

  deleteOrder: async (id: number, userId: number) => {
    const order = await orderRepository.findById(id)
    if (!order) {
      throw new AppError(ErrorMessages.ORDER_NOT_FOUND, 404)
    }

    const isOwner = order.userId === userId
    if (!isOwner) {
      throw new AppError(ErrorMessages.ORDER_NOT_OWNED_BY_USER, 403)
    }

    try {
      await orderRepository.delete(id)
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
        throw new AppError(ErrorMessages.ORDER_NOT_FOUND, 404)
      }
      throw err
    }
  },
}
