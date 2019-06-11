import * as Router from 'koa-router'
import {
  removeRequest,
  listRequests,
  searchRequest,
  getRequest,
  addRequestWithPicture,
  editRequest,
  toggleRequestVolunteer,
  listRequestsMe,
  listMyRequests,
  listRequestByType,
  getRequestCover,
  getRequestFile,
  applyForTask,
  addDonnerForMaterial
} from './request.controller'

// import * as fs from 'fs'
import { authorize } from '../../lib/middlewares/authorize'
import { transact } from '../../lib/transact'
import { pledgeOrgan } from './request.controller'

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

//GET /api/request/list/bytype?type=type
requestRouter.get('/list/bytype', async ctx => {
  ctx.body = await listRequestByType(ctx.query.type)
})

requestRouter.put('/material/donation/add', async ctx => {
  ctx.body = await addDonnerForMaterial(
    ctx.request.body.request_id,
    ctx.request.body.volunteer_id
  )
})
// GET /api/request/get-cover/:request_id
requestRouter.get('/get-cover/:request_id', async ctx => {
  ctx.body = await getRequestCover(ctx.params.request_id)
})

// GET /api/request/get-file/:request_id/:filename
requestRouter.get('/get-file/:request_id/:filename', async ctx => {
  ctx.body = await getRequestFile(ctx.params.request_id, ctx.params.filename)
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
  console.log('Put request reached')
  console.log(ctx.request.body)
  if (ctx.request.files!.picture !== undefined) {
    ctx.body = await editRequest(
      ctx.params._id,
      ctx.request.body,
      ctx.state.user,
      ctx.request.files!.picture
    )
  } else {
    ctx.body = await editRequest(ctx.params._id, ctx.request.body, ctx.state.user)
  }
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
requestRouter.get('/list-mine', async ctx => {
  ctx.body = await listMyRequests(ctx.state.user._id)
})
//GET /api/request/:_id
requestRouter.get('/:_id', async ctx => {
  console.log(ctx.params._id, '')
  ctx.body = await getRequest(ctx.params._id)
})

requestRouter.get('/requests/me', authorize(['VOLUNTEER']), async ctx => {
  ctx.body = await listRequestsMe(ctx.state.user._id)
})

requestRouter.put('/task/:_id/apply', async ctx => {
  ctx.body = await applyForTask(ctx.state.user._id, ctx.params._id)
})

// POST /api/request/pledge-organ/:request_id *
requestRouter.post('/pledge-organ/:request_id', authorize(['VOLUNTEER']), async ctx => {
  ctx.body = await transact(s => pledgeOrgan(ctx.params.request_id, ctx.state.user, s))
})
