import * as Router from 'koa-router'

import { handle } from '../../lib/middlewares/handle'
import { AccountController } from './account.controller'
import { authorize } from '../../lib/middlewares/authorize'

export const accountRouter = new Router({ prefix: '/api/account' })

// GET /api/account/test // todo: temp
accountRouter.get(
  '/test',
  authorize('ADMIN'),
  handle(AccountController, (c, s) => c.test(s))
)
