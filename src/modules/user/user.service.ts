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

  createUser: (name: string) => userRepository.create(name),

  updateUser: async (id: number, name: string) => {
    try {
      return await userRepository.update(id, name)
    } catch {
      throw new AppError(ErrorMessages.USER_NOT_FOUND, 404)
    }
  },

  deleteUser: async (id: number) => {
    try {
      await userRepository.delete(id)
    } catch {
      throw new AppError(ErrorMessages.USER_NOT_FOUND, 404)
    }
  },
}
