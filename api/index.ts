import * as dotenv from 'dotenv'
dotenv.config()

import './configs/passport.config'

import { ServerApp } from 'meseret'
import { serverAppConfig } from './configs/server-app.config'
import { sslRedirect } from './lib/middlewares/ssl-redirect'

export const serverApp = new ServerApp(serverAppConfig)

// here, to make sure it is the the first middleware that runs
serverApp.app.use(sslRedirect())

// just for benchmarking purposes
serverApp.app.use(async (ctx, next) =>
  ctx.path.toLowerCase() === '/api/test' ? (ctx.body = 'Hello, world!') : await next()
)

/*
// todo ???
let CronJob = require('cron').CronJob;
// let Cron = require('./configs/Backup/backup.js');
import * as Cron from './configs/Backup/backup'
*/

// todo: attach to running http port (use the serverApp instead)
const socket = require('socket.io')
import { Socket } from 'socket.io'
import { SocketManager } from './configs/SocketManager'
export let io: Socket

serverApp
  .start()
  .then(() => {
    /*new CronJob('0 0 0 * * *', function() {
      Cron.dbAutoBackUp();
    }, null, true, 'Ethiopia/Addis_Ababa');*/
    io = socket(serverApp.servers[0])
    io.on('connection', SocketManager)
  })
  .catch(console.error)

// runners
import './runners/close-expired-requests'
