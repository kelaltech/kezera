import { Middleware } from 'koa'
import { KoaError } from '../koa-error'
import { IAccount, IAccountStatus } from '../../models/account/account.model'

export type IAuthenticateConfig = {
  message?: string
  status?: number
  allowedAccountStatuses?: IAccountStatus[]
  inactiveAccountError?: {
    message?: string
    status?: number
  }
}

export function authenticate({
  message = 'Unauthorized', // but really, it is "Unauthenticated"
  status = 401,
  allowedAccountStatuses = ['ACTIVE'],
  inactiveAccountError = {
    message: 'Inactive account',
    status: 403
  }
}: IAuthenticateConfig = {}): Middleware {
  return async (ctx, next) => {
    if (!(ctx.isAuthenticated && ctx.isAuthenticated())) {
      ctx.throw(new KoaError(message, status))
    } else if (!allowedAccountStatuses.includes((ctx.state.user as IAccount).status)) {
      ctx.throw(new KoaError(inactiveAccountError.message, inactiveAccountError.status))
    } else {
      await next()
    }
  }
}
