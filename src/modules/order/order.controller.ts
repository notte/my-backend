import type { Response } from 'express'
import type { AuthRequest } from '@/middlewares/auth.middleware.js'
import { orderService } from '@/modules/order/order.service.js'

export async function getOrders(req: AuthRequest, res: Response) {
  const orders = await orderService.getOrders()
  res.json(orders)
}

export async function getOrderById(req: AuthRequest, res: Response) {
  const order = await orderService.getOrderById(Number(req.params.id))
  res.json(order)
}

export async function getOrdersByUserId(req: AuthRequest, res: Response) {
  const orders = await orderService.getOrdersByUserId(Number(req.params.userId))
  res.json(orders)
}

export async function createOrder(req: AuthRequest, res: Response) {
  const { product } = req.body
  const order = await orderService.createOrder(product, req.userId!)
  res.status(201).json(order)
}

export async function updateOrder(req: AuthRequest, res: Response) {
  const order = await orderService.updateOrder(Number(req.params.id), req.userId!, req.body.product)
  res.json(order)
}

export async function deleteOrder(req: AuthRequest, res: Response) {
  await orderService.deleteOrder(Number(req.params.id), req.userId!)
  res.status(204).send()
}
