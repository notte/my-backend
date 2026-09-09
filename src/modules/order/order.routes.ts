import { Router } from 'express'
import {
  getOrders,
  getOrdersByUserId,
  getOrderById,
  updateOrder,
  deleteOrder,
  createOrder,
} from '@/modules/order/order.controller.js'
import { authenticate } from '@/middlewares/auth.middleware.js'
import { validate } from '@/middlewares/validate.middleware.js'
import { createOrderSchema, updateOrderSchema } from '@/modules/order/order.schema.js'
import { asyncHandler } from '@/common/utils/asyncHandler.js'

const router: Router = Router()

router.get('/', authenticate, asyncHandler(getOrders))
router.get('/:id', authenticate, asyncHandler(getOrderById))
router.get('/user/:userId', authenticate, asyncHandler(getOrdersByUserId))
router.post('/', authenticate, validate(createOrderSchema), asyncHandler(createOrder))
router.put('/:id', authenticate, validate(updateOrderSchema), asyncHandler(updateOrder))
router.delete('/:id', authenticate, asyncHandler(deleteOrder))

export default router