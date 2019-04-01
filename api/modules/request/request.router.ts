import Router = require('koa-router')
import {
  removeRequest,
  listRequests,
  searchRequest,
  getRequest,
  goingVolunteers,
  addRequestWithPicture,
  getPicture
} from './request.controller'

import * as fs from 'fs'

export const requestRouter = new Router({ prefix: '/api/request' })

requestRouter.get('/list', async ctx => {
  ctx.body = await listRequests()
})

//GET /api/request/:_id
requestRouter.get('/:_id', async ctx => {
  console.log(ctx.params._id, '')
  ctx.body = await getRequest(ctx.params._id)
})

//GET /api/request/picture/:_id
requestRouter.get('/picture/:_id', async ctx => {
  ctx.body = await getPicture(ctx.params._id)
})

requestRouter.delete('/:_id', async ctx => {
  ctx.body = await removeRequest(ctx.params._id)
})

requestRouter.get('/search?term=:term', async ctx => {
  ctx.body = await searchRequest(ctx.params.term)
})

// POST /api/request/add
requestRouter.post('/add', async ctx => {
  ctx.body = await addRequestWithPicture(
    ctx.request.body,
    ctx.state.user,
    fs.createReadStream(ctx.request.files!.picture.path)
  )
})

requestRouter.get('/:_id/attended', async ctx => {
  ctx.body = await goingVolunteers(ctx.params._id)
})
