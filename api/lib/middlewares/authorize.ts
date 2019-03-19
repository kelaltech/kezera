/*
// DISABLED B/C PROJECT IS NOT CONFIGURED FOR RBAC (ROLE-BASED ACCESS CONTROL) YET.

import { Middleware } from 'koa'
import * as Compose from 'koa-compose'
import { authenticate } from './authenticate'
import { KoaError } from '../koa-error'
import { IUser } from '../../models/account/account.model'

export function authorize(...roles: number[]): Middleware {
  return Compose([
    authenticate(),
    async (ctx, next) => {
      if (roles.includes((<{ account: IUser }>ctx.state).account.role)) await next()
      else ctx.throw(new KoaError('Unauthorized', 401))
    }
  ])
}
*/
