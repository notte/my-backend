import type { Request, Response, NextFunction, RequestHandler } from 'express'

type AsyncController = (req: Request, res: Response, next: NextFunction) => Promise<unknown>

/**
 * 包裝 async controller 函數，統一把 rejected Promise 轉交給 next(err)，
 * 避免每個 controller 都要各自寫 try...catch。
 */
export function asyncHandler(fn: AsyncController): RequestHandler {
  return function (req, res, next) {
    fn(req, res, next).catch(next)
  }
}