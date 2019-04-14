import * as Router from 'koa-router'

import { handle } from '../../lib/middlewares/handle'
import { authorize } from '../../lib/middlewares/authorize'
import { VerifierController } from './verifier.controller'

export const verifierRouter = new Router({ prefix: '/api/verifier' })

// POST /api/verifier/approve-organization-application/:_id *
verifierRouter.post(
  '/approve-organization-application/:_id',
  authorize(['VERIFIER', 'ADMIN']),
  handle(VerifierController, (c, s) => c.approveOrganizationApplication(s))
)

// POST /api/verifier/reject-organization-application/:_id *
verifierRouter.post(
  '/approve-organization-application/:_id',
  authorize(['VERIFIER', 'ADMIN']),
  handle(VerifierController, (c, s) => c.rejectOrganizationApplication(s))
)
