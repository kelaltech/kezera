import * as Router from 'koa-router'

import { handle } from '../../lib/middlewares/handle'
import { OrganizationController } from './organization.controller'

export const organizationRouter = new Router({ prefix: '/api/organization' })

// POST /api/organization/apply
organizationRouter.post('/apply', handle(OrganizationController, (c, s) => c.apply(s)))
