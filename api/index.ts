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
export let io: Socket
serverApp
  .start()
  .then(() => {
    io = socket(serverApp.servers[0])
    io.on('connection', SocketManager)
  })
  .catch(console.error)
