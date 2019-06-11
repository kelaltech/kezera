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
  listRequestsMe,
  listMyRequests,
  listRequestByType
} from './request.controller'

import * as fs from 'fs'
import { authorize } from '../../lib/middlewares/authorize'

export const requestRouter = new Router({ prefix: '/api/request' })



requestRouter.get('/list-mine', async ctx => {
  ctx.body = await listMyRequests(ctx.state.user._id)
})

requestRouter.get('/search', async ctx => {
  ctx.body = await searchRequest(ctx.params.term)
})


requestRouter.get('/list', async ctx => {
  ctx.body = await listRequests()
})

//GET /api/request/listbytype?type=type
requestRouter.get('/list/bytype',async ctx=> {
  ctx.body = await listRequestByType(ctx.query.type)
})



//GET /api/request/get-cover/:_id
requestRouter.get('/get-cover/:_id', async ctx => {
  ctx.body = await getPicture(ctx.params._id)
})

requestRouter.delete('/:_id', async ctx => {
  ctx.body = await removeRequest(ctx.params._id)
})

// POST /api/request/add
requestRouter.post('/add', async ctx => {
  ctx.body = await addRequestWithPicture(
    ctx.request.body,
    ctx.state.user,
    ctx.request.files!.picture
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
})



requestRouter.put(
  '/toggle-request-volunteer/:request_id',
  authorize(['VOLUNTEER']),
  async ctx => {
    ctx.body = await toggleRequestVolunteer(ctx.params.request_id, ctx.state.user._id)
  }
)
requestRouter.put(
  '/toggle-request-volunteer/:request_id',
  authorize(['VOLUNTEER']),
  async ctx => {
    ctx.body = await toggleRequestVolunteer(ctx.params.request_id, ctx.state.user._id)
  }
)

//GET /api/request/:_id
requestRouter.get('/:_id', async ctx => {
  console.log(ctx.params._id, '')
  ctx.body = await getRequest(ctx.params._id)
})

requestRouter.get('/requests/me', authorize(['VOLUNTEER']), async ctx => {
  ctx.body = await listRequestsMe(ctx.state.user._id)
})
