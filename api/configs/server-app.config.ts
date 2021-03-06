import { IServerAppConfig } from 'meseret'
import * as KoaPassport from 'koa-passport'
import * as path from 'path'

// models
import { AccountModel } from '../models/account/account.model'
import { ActivityModel } from '../models/activity/activity.model'
import { CertificateModel } from '../models/certificate/certificate.model'
import { commentModel } from '../models/comment/comment.model'
import { EventModel } from '../models/event/event.model'
import { FundraisingModel } from '../models/fundraising/fundraising.model'
import { KeyModel } from '../models/key/key.model'
import { MaterialModel } from '../models/material/material.model'
import { NewsModel } from '../models/news/news.model'
import { OrganModel } from '../models/organ/organ.model'
import { OrganizationModel } from '../models/organization/organization.model'
import { OrganizationApplicationModel } from '../models/organization-application/organization-application.model'
import { RequestModel } from '../models/request/request.model'
import { SpamReportModel } from '../models/spam-report/spam-report.model'
import { TaskModel } from '../models/task/task.model'
import { VolunteerModel } from '../models/volunteer/volunteer.model'

// routers
import { accountRouter } from '../modules/account/account.router'
import { activityRouter } from '../modules/activity/activity.router'
import { adminRouter } from '../modules/admin/admin.router'
import { certificateRouter } from '../modules/certificate/certificate.router'
import { commentRouter } from '../modules/comment/comment.route'
import { eventRouter } from '../modules/event/event.router'
import { newsRouter } from '../modules/news/news.route'
import { organizationRouter } from '../modules/organization/organization.router'
import { requestRouter } from '../modules/request/request.router'
import { spamRouter } from '../modules/spam/spam.router'
import { verifierRouter } from '../modules/verifier/verifier.router'
import { volunteerRouter } from '../modules/volunteer/volunteer.router'

export const serverAppConfig: IServerAppConfig = {
  name: 'SPVA',

  mongoUris: process.env.MONGO_URL || 'mongodb://localhost/spva',
  httpServers: [
    {
      hostname: process.env.HOSTNAME || undefined,
      port: Number(process.env.PORT) || 8900
    }
  ],

  models: [
    ActivityModel,
    AccountModel,
    CertificateModel,
    commentModel,
    EventModel,
    FundraisingModel,
    KeyModel,
    MaterialModel,
    NewsModel,
    OrganModel,
    OrganizationModel,
    OrganizationApplicationModel,
    RequestModel,
    SpamReportModel,
    TaskModel,
    VolunteerModel
  ],

  routers: [
    adminRouter,
    activityRouter,
    accountRouter,
    commentRouter,
    certificateRouter,
    eventRouter,
    newsRouter,
    organizationRouter,
    requestRouter,
    spamRouter,
    verifierRouter,
    volunteerRouter
  ],

  publicDirs: [path.join(process.cwd(), 'web', 'build')],
  spaFileRelativePath: path.join('web', 'build', 'index.html'),
  cacheFiles: {
    '/service-worker.js': { cacheControl: 'no-cache', maxAge: 0 }
  },

  bodyParserMultipart: true,
  keys: ['WE ARE THE COOKIE KEYS', 'CHANGE US', 'USE .env'], // ...todo
  sessionMaxAge: 1000 * 60 * 60 * 24 * 14,
  sessionRenew: true,

  middleware: [KoaPassport.initialize(), KoaPassport.session()],

  log: process.env.NODE_ENV !== 'production'
}
