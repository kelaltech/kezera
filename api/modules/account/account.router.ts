import * as Router from 'koa-router'

import { handle } from '../../lib/middlewares/handle'
import { AccountController } from './account.controller'
import { authorize } from '../../lib/middlewares/authorize'
import { login } from '../../lib/middlewares/login'
import { logout } from '../../lib/middlewares/logout'

export const accountRouter = new Router({ prefix: '/api/account' })

// GET /api/account/test // todo: temp
accountRouter.get(
  '/test',
  authorize('ADMIN'),
  handle(AccountController, (c, s) => c.test(s))
)

// POST /api/account/login
accountRouter.post('/login', login({ strategyName: 'local' }))

// all /api/account/logout
accountRouter.all('/logout', logout({}))
