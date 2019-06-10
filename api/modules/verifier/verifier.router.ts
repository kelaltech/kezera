import * as Router from 'koa-router'

import { handle } from '../../lib/middlewares/handle'
import { authorize } from '../../lib/middlewares/authorize'
import { VerifierController } from './verifier.controller'

export const verifierRouter = new Router({ prefix: '/api/verifier' })

/* GENERAL: */

// GET /api/organization/get-organization-application/:_id *
verifierRouter.get(
  '/get-organization-application/:_id',
  authorize(['VERIFIER', 'ADMIN']),
  handle(VerifierController, (c, s) => c.getOrganizationApplication(s))
)

// GET /api/organization/get-organization-application-logo/:_id?size={200}&quality={80} *
verifierRouter.get(
  '/get-organization-application-logo/:_id',
  authorize(['VERIFIER', 'ADMIN']),
  handle(VerifierController, (c, s) => c.getOrganizationApplicationLogo(s))
)

// GET /api/organization/search-organization-applications?term=&since={Date.now()}&count={10} *
verifierRouter.get(
  '/search-organization-applications',
  authorize(['VERIFIER', 'ADMIN']),
  handle(VerifierController, (c, s) => c.searchOrganizationApplications(s))
)

/* ORGANIZATION APPLICATION OFFICIAL DOCUMENTS */

// GET /api/organization/list-organization-application-official-documents/:application_id *
verifierRouter.get(
  '/list-organization-application-official-documents/:application_id',
  authorize(['VERIFIER', 'ADMIN']),
  handle(VerifierController, c => c.listOrganizationApplicationOfficialDocuments())
)

// GET /api/organization/download-organization-application-official-document/:application_id/:filename *
verifierRouter.get(
  '/download-organization-application-official-document/:application_id/:filename',
  authorize(['VERIFIER', 'ADMIN']),
  handle(VerifierController, c => c.downloadOrganizationApplicationOfficialDocument())
)

/* ORGANIZATION APPLICATION REVIEW: */

// POST /api/verifier/approve-organization-application/:_id *
verifierRouter.post(
  '/approve-organization-application/:_id',
  authorize(['VERIFIER', 'ADMIN']),
  handle(VerifierController, (c, s) => c.approveOrganizationApplication(s))
)

// POST /api/verifier/reject-organization-application/:_id *
verifierRouter.post(
  '/reject-organization-application/:_id',
  authorize(['VERIFIER', 'ADMIN']),
  handle(VerifierController, (c, s) => c.rejectOrganizationApplication(s))
)
