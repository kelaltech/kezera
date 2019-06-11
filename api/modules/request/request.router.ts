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
  listRequestVolunteers,
  listRequestsMe
} from './request.controller'

import * as fs from 'fs'
import { authorize } from '../../lib/middlewares/authorize'

export const requestRouter = new Router({ prefix: '/api/request' })

requestRouter.get('/list', async ctx => {
  console.log('was here')
  ctx.body = await listRequests()
})
requestRouter.get('/search?term=:term', async ctx => {
  ctx.body = await searchRequest(ctx.params.term)
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
})

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
requestRouter.put(
  '/toggle-request-volunteer/:request_id',
  authorize(['VOLUNTEER']),
  async ctx => {
    ctx.body = await toggleRequestVolunteer(ctx.params.request_id, ctx.state.user._id)
  }
)

requestRouter.get('/requests/me', authorize(['VOLUNTEER']), async ctx => {
  ctx.body = await listRequestsMe(ctx.state.user._id)
})
