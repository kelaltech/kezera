import { IServerAppConfig } from 'meseret'
import * as KoaPassport from 'koa-passport'
import * as path from 'path'

import { AccountModel } from '../models/account/account.model'
import { KeyModel } from '../models/key/key.model'
import { OrganizationModel } from '../models/organization/organization.model'
import { OrganizationApplicationModel } from '../models/organization-application/organization-application.model'

import { accountRouter } from '../modules/account/account.router'
import { newsRouter } from '../modules/news/news.route'
import { requestRouter } from '../modules/request/request.router'
import { eventRouter } from '../modules/event/event.router'
import { organizationRouter } from '../modules/organization/organization.router'
import { fundRouter } from '../modules/fundraising/fundraising.router'
import { FundModel } from '../models/fundraising/fundraising.model'

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
    AccountModel,
    KeyModel,
    OrganizationModel,
    OrganizationApplicationModel,
    FundModel
  ],

  routers: [
    accountRouter,
    newsRouter,
    eventRouter,
    organizationRouter,
    requestRouter,
    fundRouter
  ],

  publicDirs: [path.join(process.cwd(), 'web', 'build')],
  spaFileRelativePath: path.join('web', 'build', 'index.html'),

  bodyParserMultipart: true,
  keys: ['WE ARE THE COOKIE KEYS', 'CHANGE US', 'USE .env'], // ...todo
  sessionMaxAge: 1000 * 60 * 60 * 24 * 14,
  sessionRenew: true,

  middleware: [KoaPassport.initialize(), KoaPassport.session()],

  log: process.env.NODE_ENV !== 'production'
}
