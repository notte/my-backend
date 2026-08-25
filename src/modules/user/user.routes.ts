import { Router } from 'express'
import { getUsers, getUserById, updateUser, deleteUser } from '@/modules/user/user.controller.js'
import { validate } from '@/middlewares/validate.middleware.js'
import { updateUserSchema } from '@/modules/user/user.schema.js'
import { authenticate } from '@/middlewares/auth.middleware.js'

const router: Router = Router()

router.get('/', getUsers)
router.get('/:id', getUserById)
router.put('/:id', validate(updateUserSchema), updateUser)
router.delete('/:id', authenticate, deleteUser)

export default router
