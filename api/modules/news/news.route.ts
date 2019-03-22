import Route = require('koa-router')

import {
  addComment,
  getAllNews,
  removeNews,
  editNews,
  searchNews,
  toggleLike,
  addNewsWithPicture,
  getNews,
  addNews
} from './news.controller'
import * as fs from 'fs'

export const newsRouter = new Route({
  prefix: '/api/news'
})

//POST /api/news/new
newsRouter.post('/new', async ctx => {
  ctx.body = await addNews(ctx.request.body, ctx.state.user)
})

// POST /api/news/new/withpic
newsRouter.post('/new/withpic', async ctx => {
  ctx.body = await addNewsWithPicture(
    ctx.request.body,
    ctx.state.user,
    fs.createReadStream(ctx.request.files!.picture.path)
  )
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

//DELETE /api/news/:_newsId
newsRouter.delete('/:newsId', async ctx => {
  ctx.body = await removeNews(ctx.query._newsId)
})

//GET /api/news/:_newsId
newsRouter.get('/:newsId', async ctx => {
  ctx.body = await getNews(ctx.query._newsId)
})

//PUT /api/news/:_newsId
newsRouter.put('/:_newsId', async ctx => {
  ctx.body = await editNews(ctx.request.body, ctx.query._newsId)
})

//GET /api/news/search?term=:term
newsRouter.get('/search', async ctx => {
  ctx.body = await searchNews(ctx.params.term)
})
//POST /api/news/:_newsId/comment/new

newsRouter.post('/:_newsId/comment/new', async ctx => {
  ctx.body = await addComment(ctx.state.user, ctx.params._newsId, ctx.request.body)
})
