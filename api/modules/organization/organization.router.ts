import * as Router from 'koa-router'

import { handle } from '../../lib/middlewares/handle'
import { OrganizationController } from './organization.controller'
import { authorize } from '../../lib/middlewares/authorize'

export const organizationRouter = new Router({ prefix: '/api/organization' })

/* GENERAL: */

// POST /api/organization/apply
organizationRouter.post('/apply', handle(OrganizationController, (c, s) => c.apply(s)))

// GET /api/organization/get/:_id
organizationRouter.get('/get/:_id', handle(OrganizationController, (c, s) => c.get(s)))

// GET /api/organization/me *
organizationRouter.get(
  '/me',
  authorize(['ORGANIZATION']),
  handle(OrganizationController, (c, s) => c.me(s))
)

// GET /api/organization/list?since={Date.now()}&count={10}
organizationRouter.get('/list', handle(OrganizationController, (c, s) => c.list(s)))

// GET /api/organization/search?term=&since={Date.now()}&count={10}
organizationRouter.get('/search', handle(OrganizationController, (c, s) => c.search(s)))

// PUT /api/organization/edit-me *
organizationRouter.put(
  '/edit-me',
  authorize(['ORGANIZATION']),
  handle(OrganizationController, (c, s) => c.editMe(s))
)

/* SUBSCRIPTIONS: */

// GET /api/organization/subscriptions *
organizationRouter.get(
  '/subscriptions',
  authorize(['VOLUNTEER']),
  handle(OrganizationController, (c, s) => c.subscriptions(s))
)

// PUT /api/organization/subscribe/:_id *
organizationRouter.put(
  '/subscribe/:_id',
  authorize(['VOLUNTEER']),
  handle(OrganizationController, (c, s) => c.subscribe(s))
)

// PUT /api/organization/unsubscribe/:_id *
organizationRouter.put(
  '/unsubscribe/:_id',
  authorize(['VOLUNTEER']),
  handle(OrganizationController, (c, s) => c.unsubscribe(s))
)

/* LINKS TO OTHER MODULES: */

// GET /api/organization/requests/:organization_id?since={Date.now()}&count={10}
organizationRouter.get(
  '/requests/:organization_id',
  handle(OrganizationController, (c, s) => c.requests(s))
)

// GET /api/organization/events/:organization_id?since={Date.now()}&count={10}
organizationRouter.get(
  '/events/:organization_id',
  handle(OrganizationController, (c, s) => c.events(s))
)

// GET /api/organization/news/:organization_id?since={Date.now()}&count={10}
organizationRouter.get(
  '/news/:organization_id',
  handle(OrganizationController, (c, s) => c.news(s))
)
