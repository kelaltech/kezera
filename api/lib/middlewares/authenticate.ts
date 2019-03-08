import { Middleware } from 'koa'
import { KoaError } from '../koa-error'

export function authenticate(message: string = 'Forbidden', status = 403): Middleware {
  return async (ctx, next) => {
    if (ctx.isAuthenticated && ctx.isAuthenticated()) await next()
    else ctx.throw(new KoaError(message, status))
  }
}
