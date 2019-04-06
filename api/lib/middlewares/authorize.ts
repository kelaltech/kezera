import { Middleware } from 'koa'
import * as Compose from 'koa-compose'

import { authenticate, IAuthenticateConfig } from './authenticate'
import { KoaError } from '../koa-error'
import { IAccount, IAccountRole } from '../../models/account/account.model'

export type IAuthorizeConfig = {
  error?: {
    message?: string
    status?: number
    code?: string
  }
  authenticateConfig?: IAuthenticateConfig
}

const defaultErrorMessage = 'Forbidden' // but really, it is "Unauthorized"
const defaultErrorStatus = 403
const defaultErrorCode = 'NOT_AUTHORIZED'

export function authorize(
  roles: IAccountRole[],
  {
    error = {
      message: defaultErrorMessage,
      status: defaultErrorStatus,
      code: defaultErrorCode
    },
    authenticateConfig = {}
  }: IAuthorizeConfig = {}
): Middleware {
  return Compose([
    authenticate(authenticateConfig),
    async (ctx, next) => {
      if (!roles.includes((<{ user: IAccount }>ctx.state).user.role)) {
        ctx.throw(
          new KoaError(
            (error && error.message) || defaultErrorMessage,
            (error && error.status) || defaultErrorStatus,
            (error && error.code) || defaultErrorCode
          )
        )
      } else {
        await next()
      }
    }
  ])
}
