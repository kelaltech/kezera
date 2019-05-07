import * as Router from 'koa-router'
import { AddActivity, GetActivity } from './activity.controller'

export const activityRouter = new Router({ prefix: '/api/activity' })

activityRouter.get('/:_id/list', async ctx => {
  ctx.body = await GetActivity(ctx.params._id)
})

activityRouter.post('/:_id/add', async ctx => {
  ctx.body = await AddActivity(ctx.params._id, ctx.request.body.type)
})
