import * as Router from 'koa-router'

import { handle } from '../../lib/middlewares/handle'
import { OrganizationController } from './organization.controller'
import { authorize } from '../../lib/middlewares/authorize'

export const organizationRouter = new Router({ prefix: '/api/organization' })

// POST /api/organization/apply
organizationRouter.post('/apply', handle(OrganizationController, (c, s) => c.apply(s)))

// GET /api/organization/me
organizationRouter.get(
  '/me',
  authorize(['ORGANIZATION']),
  handle(OrganizationController, (c, s) => c.me(s))
)

// GET /api/organization/:_id
organizationRouter.get('/:_id', handle(OrganizationController, (c, s) => c.get(s)))

// GET /api/organization/requests/:_id?since&count
organizationRouter.get(
  '/requests/:_id',
  handle(OrganizationController, (c, s) => c.requests(s))
)

// GET /api/organization/events/:_id?since&count
organizationRouter.get(
  '/events/:_id',
  handle(OrganizationController, (c, s) => c.events(s))
)

// GET /api/organization/news/:_id?since&count
organizationRouter.get('/news/:_id', handle(OrganizationController, (c, s) => c.news(s)))
