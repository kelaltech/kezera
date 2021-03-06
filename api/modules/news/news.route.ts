import * as Router from 'koa-router'

import {
  addComment,
  getAllNews,
  removeNews,
  editNews,
  searchNews,
  toggleLike,
  addNewsWithPicture,
  getNews,
  addNews,
  getLikes,
  listAllNews,
  getPictureFromNews,
  addPictureForNews,
  recentNews,
  getComments,
  addShare,
  getShare,
  getMyNews
} from './news.controller'

export const newsRouter = new Router({
  prefix: '/api/news'
})

//GET /api/news/recent?count=5
newsRouter.get('/recent', async ctx => {
  ctx.body = await recentNews(Number(ctx.query.count))
})

// POST /api/news/new/withpic
newsRouter.post('/new/withpic', async ctx => {
  ctx.body = await addNewsWithPicture(
    ctx.request.body,
    ctx.state.user,
    ctx.request.files!.picture
  )
})
//POST /api/news/new
newsRouter.post('/new', async ctx => {
  ctx.body = await addNews(ctx.request.body)
})

newsRouter.get('/allnews', async ctx => {
  ctx.body = await listAllNews()
})
//GET /api/news/search?term=:term
newsRouter.get('/search', async ctx => {
  ctx.body = await searchNews(ctx.query.term)
})

//GET /api/news/me
newsRouter.get('/me', async ctx => {
  ctx.body = await getMyNews(ctx.state.user)
})

//GET /api/news/:_newsId
newsRouter.get('/:_newsId', async ctx => {
  ctx.body = await getNews(ctx.params._newsId)
})
//DELETE /api/news/:_newsId
newsRouter.delete('/:_newsId', async ctx => {
  ctx.body = await removeNews(ctx.params._newsId)
})
//POST /api/news/:_newsId/addpic
newsRouter.post('/:_newsId/addpic', async ctx => {
  const picture = ctx.request.files!.picture

  ctx.body = await addPictureForNews(picture, ctx.params._newsId)
})

//GET /api/news/:_newsId/pic?size={1080}&quality={100}  default values
newsRouter.get('/:_newsId/pic', async ctx => {
  ctx.body = await getPictureFromNews(
    ctx.params._newsId,
    ctx.query.pictureId,
    Number(ctx.query.size ? ctx.query.size : 1080),
    Number(ctx.query.quality ? ctx.query.quality : 100)
  )
})

//PUT /api/news/:_newsID/like
newsRouter.put('/:_newsId/like', async ctx => {
  //return a number
  ctx.body = await toggleLike(ctx.params._newsId, ctx.state.user)
})

// GET /api/news/list?since&count
newsRouter.get('/list', async ctx => {
  ctx.body = await getAllNews(Number(ctx.query.since), Number(ctx.query.conunt))
})

newsRouter.get('/:_newsId/likes', async ctx => {
  //return the users profile

  ctx.body = await getLikes(ctx.params._newsId)
})
newsRouter.get('/:_newsId/share', async ctx => {
  ctx.body = await getShare(ctx.params._newsId)
})
newsRouter.put('/:_newsId/share', async ctx => {
  ctx.body = await addShare(ctx.params._newsId, ctx.state.user)
})

//PUT /api/news/:_newsId
newsRouter.put('/:_newsId', async ctx => {
  ctx.body = await editNews(ctx.request.body, ctx.params._newsId)
})

//POST /api/news/:_newsId/comment/new

newsRouter.post('/:_newsId/comment/new', async ctx => {
  ctx.body = await addComment(ctx.state.user, ctx.params._newsId, ctx.request.body)
})

newsRouter.get('/:_id/comments', async ctx => {
  ctx.body = await getComments(ctx.params._id)
})
