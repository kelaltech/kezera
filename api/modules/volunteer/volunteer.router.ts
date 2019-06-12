import Router = require('koa-router')
import {
  RegisterVolunteer,
  subscribedOrganization,
  searchVolunteer,
  volunteerInfo,
  editVolunteerInfo,
  getVolunteer,
  getTaskTypes
} from './volunteer.controller'
import { authorize } from '../../lib/middlewares/authorize'
import { transact } from '../../lib/transact'

export const volunteerRouter = new Router({
  prefix: '/api/volunteer'
})

// POST /api/volunteer/register
volunteerRouter.post('/register', async (ctx: any) => {
  ctx.body = await RegisterVolunteer(ctx.request.body)
})

// GET /api/volunteer/me *
volunteerRouter.get('/me', authorize(['VOLUNTEER']), async ctx => {
  ctx.body = await volunteerInfo(ctx.state.user)
})

// GET /api/volunteer/get/:volunteer_id
volunteerRouter.get('/get/:volunteer_id', async ctx => {
  ctx.body = await transact(s => getVolunteer(ctx.params.volunteer_id, s))
})

volunteerRouter.put('/edit', async ctx => {
  console.log('This is from /edit route', ctx.request.body)
  ctx.body = await editVolunteerInfo(ctx.request.body, ctx.state.user)
})
// GET /api/volunteer/my/organization
volunteerRouter.get('/my/organization', async ctx => {
  ctx.body = await subscribedOrganization(ctx.state.user)
})

// GET /api/volunteer/search?term=term
volunteerRouter.get('/search', async ctx => {
  ctx.body = await searchVolunteer(ctx.query.term)
})

volunteerRouter.get('/task/search', async ctx => {
  console.log(ctx.query.term)
  ctx.body = await getTaskTypes(ctx.query.term)
})
