import * as Router from 'koa-router'

import { authenticate } from '../../lib/middlewares/authenticate'
import { handle } from '../../lib/middlewares/handle'
import { SpamController } from './spam.controller'
import { authorize } from '../../lib/middlewares/authorize'

export const spamRouter = new Router({ prefix: '/api/spam' })

/* REPORT */

// POST /api/spam/report/organization *
spamRouter.post(
  '/report/organization',
  authenticate(),
  handle(SpamController, (c, s) => c.report('ORGANIZATION', s))
)

// POST /api/spam/report/request *
spamRouter.post(
  '/report/request',
  authenticate(),
  handle(SpamController, (c, s) => c.report('REQUEST', s))
)

// POST /api/spam/report/event *
spamRouter.post(
  '/report/event',
  authenticate(),
  handle(SpamController, (c, s) => c.report('EVENT', s))
)

// POST /api/spam/report/news *
spamRouter.post(
  '/report/news',
  authenticate(),
  handle(SpamController, (c, s) => c.report('NEWS', s))
)

/* GENERAL */

// GET /api/spam/search-reports?term={''}&count={10}&since={Date.now()} *
spamRouter.post(
  '/search-reports',
  authorize(['VERIFIER']),
  handle(SpamController, (c, s) => c.searchReports(s))
)

// GET /api/spam/get-report/:_id *

// PUT /api/spam/handle/:_id *

// PUT /api/spam/ignore-report *
