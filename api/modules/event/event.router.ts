import * as Router from 'koa-router'

import {
  getEvent,
  listAllEvents,
  removeEvent,
  searchEvent,
  attendedUsers,
  usersLikedAnEvent,
  getComments,
  addComment,
  addEvent,
  attendanceVerifivation,
  getEventPicture,
  editEvent,
  getAttendedUsers,
  toggleLike,
  toggleAttend,
  going,
  isLiked,
  isGoing,
  getInterested,
  getOrganizationEvents,
  getRecentEvents,
  listLatestEvents,
  upcomingEvents
} from './event.controller'

export const eventRouter = new Router({ prefix: '/api/event' })

// /api/event/all"
eventRouter.get('/all', async ctx => {
  console.log('all')
  ctx.body = await listAllEvents()
})

eventRouter.get('/latest', async ctx => {
  console.log('fetching the latest events')
  ctx.body = await listLatestEvents()
})

eventRouter.get('/upcoming', async ctx => {
  console.log('fetching the upcoming events')
  ctx.body = await upcomingEvents()
})

eventRouter.get('/mine', async ctx => {
  console.log('This is the event of the organization', ctx.state.user._id)
  ctx.body = await getOrganizationEvents(ctx.state.user._id)
})

eventRouter.get('/recent', async ctx => {
  ctx.body = await getRecentEvents(Number(ctx.query.count))
})

// /api/event/search/term
eventRouter.get('/search', async ctx => {
  ctx.body = await searchEvent(ctx.query.term)
})

// /api/event/create
eventRouter.post('/create', async ctx => {
  console.log(ctx.request.body.event)
  console.log(ctx.request.files!.image.path)
  ctx.body = await addEvent(JSON.parse(ctx.request.body.event), ctx.state.user._id, ctx)
})

eventRouter.put('/:_id/attended', async ctx => {
  console.log('/:_id/attended+put')
  ctx.body = await attendedUsers(ctx.params._id, ctx.request.body)
})

eventRouter.get('/:_id/attended', async ctx => {
  ctx.body = await getAttendedUsers(ctx.params._id)
})

// /api/event/:_id"
eventRouter.put('/:_id', async ctx => {
  console.log(ctx.request.body.event)
  ctx.body = await editEvent(
    ctx.params._id,
    JSON.parse(ctx.request.body.event),
    ctx.state.user._id,
    ctx
  )
})

// /api/event/:_id/picture"
eventRouter.get('/:_id/picture', async ctx => {
  console.log('picture')
  ctx.body = await getEventPicture(ctx.params._id)
})

eventRouter.get('/:_id/attendance/verify', async ctx => {
  // console.log("/:_id/attended")
  // console.log(ctx.request.body);
  ctx.body = await attendanceVerifivation(ctx.params._id)
})

// /api/event/:_id
eventRouter.delete('/:_id', async ctx => {
  ctx.body = await removeEvent(ctx.params._id, ctx.state.user._id)
})
// /api/event/:_id/comments
eventRouter.get('/:_id/comments', async ctx => {
  ctx.body = await getComments(ctx.params._id)
})

eventRouter.get('/:_id/likes', async ctx => {
  console.log('/:_id/like')
  ctx.body = await usersLikedAnEvent(ctx.params._id)
})

eventRouter.get('/:_id/interested', async ctx => {
  console.log('/:_id/interested')
  ctx.body = await getInterested(ctx.params._id)
})

eventRouter.post('/:_id/comment/new', async ctx => {
  ctx.body = await addComment(ctx.state.user, ctx.params._id, ctx.request.body)
})

eventRouter.put('/:_id/like', async ctx => {
  ctx.body = await toggleLike(ctx.params._id, ctx.state.user)
})

eventRouter.put('/:_id/interest', async ctx => {
  ctx.body = await toggleAttend(ctx.params._id, ctx.state.user)
})

eventRouter.put('/:_id/going', async ctx => {
  ctx.body = await going(ctx.params._id, ctx.state.user._id)
})

eventRouter.get('/:_id/isGoing', async ctx => {
  ctx.body = await isGoing(ctx.params._id, ctx.state.user._id)
})

eventRouter.get('/:_id/isLiked', async ctx => {
  console.log('likes')
  ctx.body = await isLiked(ctx.params._id, ctx.state.user._id)
})

// api/event/:_id
eventRouter.get('/:_id', async ctx => {
  console.log('/:_id asdsad')
  ctx.body = await getEvent(ctx.params._id)
})

eventRouter.get('/organization/:_id', async ctx => {
  console.log('was here')
  ctx.body = await getOrganizationEvents(ctx.params._id)
})
