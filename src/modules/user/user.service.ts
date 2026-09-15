import { userRepository } from '@/modules/user/user.repository.js'
import { AppError } from '@/common/exceptions/AppError.js'
import { ErrorMessages } from '@/common/constants/errorCodes.js'
import { Prisma } from '@/config/database.js'

export const userService = {
  getUsers: () => userRepository.findMany(),

  getUserById: async (id: number) => {
    const user = await userRepository.findById(id)
    if (!user) {
      throw new AppError(ErrorMessages.USER_NOT_FOUND, 404)
    }
    return user
  },

  updateUser: async (
    id: number,
    name: string,
    requesterId: number,
    requesterRole: 'USER' | 'ADMIN',
  ) => {
    const target = await userRepository.findById(id)
    if (!target) {
      throw new AppError(ErrorMessages.USER_NOT_FOUND, 404)
    }

    const isSelf = requesterId === id
    const isAdmin = requesterRole === 'ADMIN'
    if (!isSelf && !isAdmin) {
      throw new AppError('You are not allowed to update this user', 403)
    }

    return await userRepository.update(id, name)
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

    try {
      await userRepository.delete(id)
    } catch (err) {
      // P2003：外鍵約束失敗，代表這個使用者名下還有訂單參照著他，
      // 這是「無法刪除」的明確業務規則，用 409 Conflict 清楚表達，
      // 而不是籠統地當成 404 或 500，掩蓋掉真正的原因。
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2003') {
        throw new AppError(ErrorMessages.USER_HAS_ORDERS, 409)
      }
      // 其他未預期的錯誤，原樣往外拋，讓 errorHandler 記錄真實錯誤內容，
      // 不要在這裡吞掉或誤標成別的錯誤類型。
      throw err
    }
  },
}
