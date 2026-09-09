import { userRepository } from '@/modules/user/user.repository.js'
import { AppError } from '@/common/exceptions/AppError.js'
import { ErrorMessages } from '@/common/constants/errorCodes.js'

export const userService = {
  getUsers: () => userRepository.findMany(),

  getUserById: async (id: number) => {
    const user = await userRepository.findById(id)
    if (!user) {
      throw new AppError(ErrorMessages.USER_NOT_FOUND, 404)
    }
    return user
  },

  updateUser: async (id: number, name: string) => {
    try {
      return await userRepository.update(id, name)
    } catch {
      throw new AppError(ErrorMessages.USER_NOT_FOUND, 404)
    }
  },

  deleteUser: async (id: number, requesterId: number, requesterRole: 'USER' | 'ADMIN') => {
    const target = await userRepository.findById(id)
    if (!target) {
      throw new AppError(ErrorMessages.USER_NOT_FOUND, 404)
    }

    const isSelf = requesterId === id
    const isAdmin = requesterRole === 'ADMIN'
    if (!isSelf && !isAdmin) {
      throw new AppError('You are not allowed to delete this user', 403)
    }

    await userRepository.delete(id)
  },
}