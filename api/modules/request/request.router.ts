import Router = require('koa-router')
import {
  removeRequest,
  listRequests,
  searchRequest,
  getRequest,
  goingVolunteers,
  addRequestWithPicture
} from './request.controller'

import * as fs from 'fs'

export const requestRouter = new Router({ prefix: '/api/request' })

//GET /api/request/:_Id
requestRouter.get('/:_Id', async ctx => {
  console.log(ctx.params._Id, '')
  ctx.body = await getRequest(ctx.params._Id)
})
requestRouter.delete('/:_id', async ctx => {
  ctx.body = await removeRequest(ctx.params._id)
})
requestRouter.get('/list', async ctx => {
  ctx.body = await listRequests()
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
