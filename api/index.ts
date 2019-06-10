import * as dotenv from 'dotenv'
dotenv.config()

import './configs/passport.config'

import { ServerApp } from 'meseret'
import { serverAppConfig } from './configs/server-app.config'
import { sslRedirect } from './lib/middlewares/ssl-redirect'
const socket = require('socket.io')

export const serverApp = new ServerApp(serverAppConfig)

// todo: temp
import './configs/collections-patch.temp'
import { Socket } from 'socket.io'
import { SocketManager } from './configs/SocketManager'

// here, to make sure it is the the first middleware that runs
serverApp.app.use(sslRedirect())

// just for benchmarking purposes
serverApp.app.use(async (ctx, next) =>
  ctx.path.toLowerCase() === '/api/test' ? (ctx.body = 'Hello, world!') : await next()
)

// todo: add a feature in meseret to whitelist no-cache files (also, generally make koa-static-cache's options accessible), then remove this
// no-cache for /service-worker.js
serverApp.app.use(async (ctx, next) => {
  await next()

  if (ctx.path.toLowerCase() === '/service-worker.js')
    ctx.set('Cache-Control', 'no-cache, max-age=0')
})

// todo: attach to running http port (use the serverApp instead)
export let io: Socket
serverApp
  .start()
  .then(() => {
    io = socket(serverApp.servers[0])
    io.on('connection', SocketManager)
  })
  .catch(console.error)
