import { Middleware } from 'koa'
import * as Compose from 'koa-compose'

import { authenticate } from './authenticate'
import { KoaError } from '../koa-error'
import { IAccount, IAccountRole } from '../../models/account/account.model'

export function authorize(...roles: IAccountRole[]): Middleware {
  return Compose([
    authenticate(),
    async (ctx, next) => {
      if (roles.includes((<{ account: IAccount }>ctx.state).account.role)) await next()
      else ctx.throw(new KoaError('Unauthorized', 401))
    }
  ])
}
