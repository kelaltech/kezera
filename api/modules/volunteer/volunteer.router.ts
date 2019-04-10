import Router = require('koa-router')
import {
  RegisterVolunteer,
  subscribedOrganization,
  searchVolunteer
} from './volunteer.controller'

export const volunteerRouter = new Router({
  prefix: '/api/volunteer'
})

// POST /api/volunteer/register
volunteerRouter.post('/register', async (ctx: any) => {
  ctx.body = await RegisterVolunteer(ctx.request.body)
})

// GET /api/volunteer/my/organization
volunteerRouter.get('/my/organization', async ctx => {
  ctx.body = await subscribedOrganization(ctx.state.user)
})

// GET /api/volunteer/search?term=term
volunteerRouter.get('/search', async ctx => {
  ctx.body = await searchVolunteer(ctx.query.term)
})
