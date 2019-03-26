import * as Router from 'koa-router'

import { handle } from '../../lib/middlewares/handle'
import { authenticate } from '../../lib/middlewares/authenticate'
import { AccountController } from './account.controller'
import { login } from '../../lib/middlewares/login'
import { logout } from '../../lib/middlewares/logout'

export const accountRouter = new Router({ prefix: '/api/account' })

/* GENERAL */

// GET /api/account/me
accountRouter.get('/me', authenticate(), handle(AccountController, (c, s) => c.me(s)))

// PUT /api/account/edit-me *
accountRouter.put(
  '/edit-me',
  authenticate(),
  handle(AccountController, (c, s) => c.editMe(s))
)

/* PHOTO */

// POST /api/account/add-photo *
accountRouter.post(
  '/add-photo',
  authenticate(),
  handle(AccountController, (c, s) => c.addPhoto(s))
)

// GET /api/account/get-photo/:account_id
accountRouter.get('/get-photo/:account_id', handle(AccountController, c => c.getPhoto()))

// GET /api/account/remove-photo *
accountRouter.get('/remove-photo', handle(AccountController, (c, s) => c.removePhoto(s)))

/* PASSWORD RESET */

// POST /api/account/reset/start
accountRouter.post(
  '/reset/start',
  handle(AccountController, (c, s) => c.startPasswordReset(s))
)

// POST /api/account/reset/finish
accountRouter.post(
  '/reset/finish',
  handle(AccountController, (c, s) => c.finishPasswordReset(s))
)

/* BASIC AUTH */

// POST /api/account/login
accountRouter.post('/login', login({ strategyName: 'local' }))

// all /api/account/logout
accountRouter.all('/logout', logout({}))
