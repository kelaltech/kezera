import * as Router from 'koa-router'
import { AddActivity, GetActivity } from './activity.controller'

export const activityRouter = new Router({ prefix: '/api/activity' })

activityRouter.get('/:_id/list', async ctx => {
  ctx.body = await GetActivity(ctx.params._id)
})

activityRouter.post('/add', async ctx => {
  console.log(ctx.request.body)
  ctx.body = await AddActivity(ctx.request.body, ctx.state.user._id)
})
