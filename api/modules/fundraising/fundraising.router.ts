import * as Router from 'koa-router'
import { AddFund, ListFunds } from './fundraising.controller'

export const taskRouter = new Router({ prefix: '/api/task' })

taskRouter.post('/add', async ctx => {
  ctx.body = await AddFund(ctx.request.body, ctx.state.user._id)
})

// /api/fundraising/all"
taskRouter.get('/all', async ctx => {
  ctx.body = await ListFunds()
})
