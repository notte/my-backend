import { Router } from 'express'
import { getUsers, getUserById, updateUser, deleteUser } from '@/modules/user/user.controller.js'
import { validate } from '@/middlewares/validate.middleware.js'
import { updateUserSchema } from '@/modules/user/user.schema.js'
import { authenticate } from '@/middlewares/auth.middleware.js'
import { asyncHandler } from '@/common/utils/asyncHandler.js'

const router: Router = Router()

router.get('/', asyncHandler(getUsers))
router.get('/:id', asyncHandler(getUserById))
router.put('/:id', authenticate, validate(updateUserSchema), asyncHandler(updateUser))
router.delete('/:id', authenticate, asyncHandler(deleteUser))

export default router
