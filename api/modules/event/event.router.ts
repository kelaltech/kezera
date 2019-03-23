import Router = require('koa-router')
import {
  getEvent,
  listAllEvents,
  removeEvent,
  searchEvent,
  attendedUsers,
  interestedUsers,
  usersLikedAnEvent,
  getComments,
  addComment,
  addEventWithPicture
} from './event.controller'
import * as fs from 'fs'

export const eventRouter = new Router({ prefix: '/api/event' })

eventRouter.get('/:_id', async ctx => {
  ctx.body = await getEvent(ctx.params._id)
})
eventRouter.delete('/:_id', async ctx => {
  ctx.body = await removeEvent(ctx.params._id, ctx.state.user)
})
eventRouter.get('/all', async ctx => {
  ctx.body = await listAllEvents()
})
eventRouter.get('/search?term=:term', async ctx => {
  ctx.body = await searchEvent(ctx.params.term)
})

eventRouter.post('/create', async ctx => {
  ctx.body = await addEventWithPicture(
    ctx.request.body,
    ctx.state.user,
    fs.createReadStream(ctx.request.files!.picture.path)
  )
})

eventRouter.get('/:_id/attended', async ctx => {
  ctx.body = await attendedUsers(ctx.params._id)
})

eventRouter.get('/:_id/interested', async ctx => {
  ctx.body = await interestedUsers(ctx.params._id)
})

eventRouter.get('/:_id/comments', async ctx => {
  ctx.body = await getComments(ctx.params._id)
})

eventRouter.get('/:_id/likes', async ctx => {
  ctx.body = await usersLikedAnEvent(ctx.params._id)
})

eventRouter.post('/:_id/comment/new', async ctx => {
  ctx.body = await addComment(ctx.state.user, ctx.params._id, ctx.request.body)
})
