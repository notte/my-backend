import { orderRepository } from '@/modules/order/order.repository.js'
import { userRepository } from '@/modules/user/user.repository.js'
import { AppError } from '@/common/exceptions/AppError.js'
import { ErrorMessages } from '@/common/constants/errorCodes.js'

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

  updateOrder: async (id: number, product: string) => {
    try {
      return await orderRepository.update(id, product)
    } catch {
      throw new AppError(ErrorMessages.ORDER_NOT_FOUND, 404)
    }
  },

  deleteOrder: async (id: number) => {
    try {
      await orderRepository.delete(id)
    } catch {
      throw new AppError(ErrorMessages.ORDER_NOT_FOUND, 404)
    }
  },
}
