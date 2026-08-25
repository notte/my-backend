import type { Request, Response, NextFunction } from 'express'
import { orderService } from '@/modules/order/order.service.js'

export async function getOrders(req: Request, res: Response) {
  const orders = await orderService.getOrders()
  res.json(orders)
}

export async function getOrderById(req: Request, res: Response, next: NextFunction) {
  try {
    const order = await orderService.getOrderById(Number(req.params.id))
    res.json(order)
  } catch (err) {
    next(err)
  }
}

export async function getOrdersByUserId(req: Request, res: Response, next: NextFunction) {
  try {
    const orders = await orderService.getOrdersByUserId(Number(req.params.userId))
    res.json(orders)
  } catch (err) {
    next(err)
  }
}

export async function createOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const { product, userId } = req.body
    const order = await orderService.createOrder(product, userId)
    res.status(201).json(order)
  } catch (err) {
    next(err)
  }
}

export async function updateOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const order = await orderService.updateOrder(Number(req.params.id), req.body.product)
    res.json(order)
  } catch (err) {
    next(err)
  }
}

export async function deleteOrder(req: Request, res: Response, next: NextFunction) {
  try {
    await orderService.deleteOrder(Number(req.params.id))
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
