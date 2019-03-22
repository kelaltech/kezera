import Route = require('koa-router')

import { addNews, getAllNews, toggleLike } from './news.controller'

export const newsRouter = new Route({
  prefix: '/api/news'
})

// POST /api/news/new
newsRouter.post('/new', async ctx => {
  ctx.body = await addNews(ctx.request.body, ctx.state.user)
})

// GET /api/news/list?since&count
newsRouter.get('/list', async ctx => {
  ctx.body = await getAllNews(Number(ctx.query.since), Number(ctx.query.conunt))
})

//PUT /api/news/:_newsID/like

newsRouter.put('/:_newsId/like', async ctx => {
  //return a number

  ctx.body = await toggleLike(ctx.query._newsId, ctx.state.user)
})
