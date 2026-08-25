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

const router: Router = Router()

router.get('/', authenticate, getOrders)
router.get('/:id', authenticate, getOrderById)
router.get('/user/:userId', authenticate, getOrdersByUserId)
router.post('/', authenticate, validate(createOrderSchema), createOrder)
router.put('/:id', authenticate, validate(updateOrderSchema), updateOrder)
router.delete('/:id', authenticate, deleteOrder)

export default router
