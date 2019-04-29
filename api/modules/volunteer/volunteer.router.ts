import Router = require('koa-router')
import {
  RegisterVolunteer,
  subscribedOrganization,
  searchVolunteer,
  volunteerInfo,
  editVolunteerInfo
} from './volunteer.controller'
import { authorize } from '../../lib/middlewares/authorize'

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
