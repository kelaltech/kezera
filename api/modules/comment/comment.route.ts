import * as Route from 'koa-router'
import {
  addComment,
  getComment,
  updateComment,
  deleteComment,
  getReplies,
  addReply
} from './comment.controller'
export const commentRouter = new Route({
  prefix: '/api/comment'
})

commentRouter.post('/add', async ctx => {
  let type = ctx.request.body.type
  let TypeId = ctx.request.body.TypeId
  console.log(TypeId)
  ctx.body = await addComment(ctx.request.body, ctx.state.user, type, TypeId)
})

commentRouter.post('/:_id/reply', async ctx => {
  console.log(ctx.request.body)
  ctx.body = await addReply(ctx.params._id, ctx.request.body, ctx.state.user._id)
})

commentRouter.get('/:_id', async ctx => {
  ctx.body = await getComment(ctx.state.user)
})

commentRouter.put('/:_id', async ctx => {
  ctx.body = await updateComment(ctx.request.body, ctx.state.user._id, ctx.params._id)
})

commentRouter.delete('/:_id/:type/:_typeId/:_ParentId', async ctx => {
  ctx.body = await deleteComment(
    ctx.params._id,
    ctx.state.user._id,
    ctx.params.type,
    ctx.params._typeId,
    ctx.params._ParentId
  )
})

commentRouter.get('/:_id/replies', async ctx => {
  ctx.body = await getReplies(ctx.params._id)
})
