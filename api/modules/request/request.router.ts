import * as Router from 'koa-router'
import {
  removeRequest,
  listRequests,
  searchRequest,
  getRequest,
  addRequestWithPicture,
  getPicture,
  editRequest,
  toggleRequestVolunteer,
  listRequestVolunteers
} from './request.controller'

import * as fs from 'fs'
import { authorize } from '../../lib/middlewares/authorize'

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

// /api/request/:_id"
requestRouter.put('/:_id', async ctx => {
  ctx.body = await editRequest(
    ctx.request.body,
    ctx.request.type,
    ctx.state.user._id,
    fs.createReadStream(ctx.request.files!.image.path)
  )
}) /*
requestRouter.put('/:_id/attended', async ctx => {
  console.log('/:_id/attended+put')
  ctx.body = await attended(ctx.params._id, ctx.request.body)
})*/

requestRouter.put('/:_id/isGoing', async ctx => {
  console.log('/:_id/attended+put')
  ctx.body = await toggleRequestVolunteer(ctx.params._id, ctx.request.body)
})
/*
requestRouter.get('/:_id/attended', async ctx => {
  ctx.body = await attended(ctx.params._id, ctx.request.body)
})*/

requestRouter.get('/list-request-volunteers/:request_id', async ctx => {
  ctx.body = await listRequestVolunteers(ctx.params.request_id)
})

requestRouter.put(
  '/toggle-request-volunteer/:request_id',
  authorize(['VOLUNTEER']),
  async ctx => {
    ctx.body = await toggleRequestVolunteer(ctx.params.request_id, ctx.state.user._id)
  }
)
/*
requestRouter.get('/:_id/attendance/verify', async ctx => {
  // console.log("/:_id/attended")
  // console.log(ctx.request.body);
  ctx.body = await attendanceVerification(ctx.params._id)
})*/
