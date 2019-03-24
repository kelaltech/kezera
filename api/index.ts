import './configs/passport.config'

import { ServerApp } from 'meseret'
import { serverAppConfig } from './configs/server-app.config'
import { sslRedirect } from './lib/middlewares/ssl-redirect'

export const serverApp = new ServerApp(serverAppConfig)

// todo: temp
import './configs/collections-patch.temp'

// here, to make sure it is the the first middleware that runs
serverApp.app.use(sslRedirect())

// just for benchmarking purposes
serverApp.app.use(async (ctx, next) =>
  ctx.path.toLowerCase() === '/api/test' ? (ctx.body = 'Hello, world!') : await next()
)

serverApp.start().catch(console.error)
