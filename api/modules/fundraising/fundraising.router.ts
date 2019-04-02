import * as Router from 'koa-router'
import { AddFund, ListFunds } from './fundraising.controller'

export const fundRouter = new Router({ prefix: '/api/fundraising' })

fundRouter.post('/add', async ctx => {
  console.log(ctx.request.body)
  ctx.body = await AddFund(ctx.request.body, ctx.state.user._id)
})

// /api/fundraising/all"
fundRouter.get('/all', async ctx => {
  ctx.body = await ListFunds()
})
