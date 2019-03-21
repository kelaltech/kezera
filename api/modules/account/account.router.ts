import * as Router from 'koa-router'

import { handle } from '../../lib/middlewares/handle'
import { authenticate } from '../../lib/middlewares/authenticate'
import { AccountController } from './account.controller'
import { login } from '../../lib/middlewares/login'
import { logout } from '../../lib/middlewares/logout'

export const accountRouter = new Router({ prefix: '/api/account' })

/* GENERAL */

// GET /api/account/me
accountRouter.get('/me', authenticate(), handle(AccountController, (c, s) => c.getMe(s)))

/* ACCOUNT RESET */

// todo

/* BASIC AUTH */

// POST /api/account/login
accountRouter.post('/login', login({ strategyName: 'local' }))

// all /api/account/logout
accountRouter.all('/logout', logout({}))
