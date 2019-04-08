import Router = require('koa-router')
import { RegisterVolunteer, subscribedOrganization } from './volunteer.controller'

export const volunteerRouter = new Router({
  prefix: '/api/volunteer'
})

volunteerRouter.post('/register', async (ctx: any) => {
  ctx.body = await RegisterVolunteer(ctx.request.body)
})

volunteerRouter.get('/my/organization', async ctx => {
  ctx.body = await subscribedOrganization(ctx.state.user)
})
