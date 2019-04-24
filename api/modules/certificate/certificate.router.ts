import * as Router from 'koa-router'
import * as sharp from 'sharp'
import * as fs from 'fs'

import { handle } from '../../lib/middlewares/handle'
import { CertificateController } from './certificate.controller'
import { authorize } from '../../lib/middlewares/authorize'

export const certificateRouter = new Router({ prefix: '/api/certificate' })

/* ISSUES */

// POST /api/certificate/issue-donation-certificate *
certificateRouter.post(
  '/issue-donation-certificate',
  authorize(['ORGANIZATION']),
  handle(CertificateController, (c, s) => c.issue('DONATION', s))
)

// POST /api/certificate/issue-event-certificate *
certificateRouter.post(
  '/issue-event-certificate',
  authorize(['ORGANIZATION']),
  handle(CertificateController, (c, s) => c.issue('EVENT_ATTENDANCE', s))
)

// POST /api/certificate/issue-membership-certificate *
certificateRouter.post(
  '/issue-membership-certificate',
  authorize(['ORGANIZATION']),
  handle(CertificateController, (c, s) => c.issue('MEMBERSHIP', s))
)

/* GENERAL */

// GET /api/certificate/list/:volunteer_id
certificateRouter.get(
  '/list/:volunteer_id',
  handle(CertificateController, (c, s) => c.list(s))
)

// GET /api/certificate/print/:_id
certificateRouter.get('/print/:_id', handle(CertificateController, (c, s) => c.print(s)))

/* PRIVACY */

// PUT /api/certificate/set-privacy/:_id/public *
certificateRouter.get(
  '/set-privacy/:_id/public',
  authorize(['VOLUNTEER']),
  handle(CertificateController, (c, s) => c.setPrivacy('PUBLIC', s))
)

// PUT /api/certificate/set-privacy/:_id/private *
certificateRouter.get(
  '/set-privacy/:_id/private',
  authorize(['VOLUNTEER']),
  handle(CertificateController, (c, s) => c.setPrivacy('PRIVATE', s))
)

/* TODO: TEMP */

// GET /api/certificate/test-print
certificateRouter.get('/test-print', async ctx => {
  let svg = fs
    .readFileSync('api/modules/certificate/templates/default/default.svg')
    .toString('utf8')

  svg = svg.replace('{PURPOSE}', 'AWESOMENESS')
  svg = svg.replace('{DATE}', new Date().toDateString().substr(3))
  svg = svg.replace('{DISPLAY_NAME}', 'Kaleab S. Melkie')
  svg = svg.replace('{ORGANIZATION_NAME}', 'kelal tech.')

  const svgBuffer = Buffer.from(svg, 'utf8')

  ctx.body = sharp(svgBuffer).png()
  ctx.type = 'png'
})
