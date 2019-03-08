/*
// DISABLED B/C PROJECT IS NOT CONFIGURED FOR RBAC (ROLE-BASED ACCESS CONTROL) YET.

import { Middleware } from 'koa'
import * as Compose from 'koa-compose'
import { authenticate } from './authenticate'
import { KoaError } from '../koa-error'
import { IUser } from '../../models/user/user.model'

export function authorize(...roles: number[]): Middleware {
  return Compose([
    authenticate(),
    async (ctx, next) => {
      if (roles.includes((<{ user: IUser }>ctx.state).user.role)) await next()
      else ctx.throw(new KoaError('Unauthorized', 401))
    }
  ])
}
*/
