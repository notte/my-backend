import { Router } from 'express'
import { register, login } from '@/modules/auth/auth.controller.js'
import { validate } from '@/middlewares/validate.middleware.js'
import { registerSchema, loginSchema } from '@/modules/auth/auth.schema.js'
import { asyncHandler } from '@/common/utils/asyncHandler.js'

const router: Router = Router()

router.post('/register', validate(registerSchema), asyncHandler(register))
router.post('/login', validate(loginSchema), asyncHandler(login))

export default router