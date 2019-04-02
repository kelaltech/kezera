import { Middleware } from 'koa'
import * as Compose from 'koa-compose'

import { authenticate, IAuthenticateConfig } from './authenticate'
import { KoaError } from '../koa-error'
import { IAccount, IAccountRole } from '../../models/account/account.model'

export function authorize(
  roles: IAccountRole[],
  authenticateConfig?: IAuthenticateConfig // todo: config.message...
): Middleware {
  return Compose([
    authenticate(authenticateConfig),
    async (ctx, next) => {
      if (roles.includes((<{ account: IAccount }>ctx.state).account.role)) await next()
      else ctx.throw(new KoaError('Forbidden', 403))
    }
  ])
}
