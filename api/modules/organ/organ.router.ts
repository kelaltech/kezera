import * as Router from 'koa-router'
import { AddOrgan, listOrganRequest, getOrgan, editOrgan, deleteOrgan } from './organ.controller'


export const organRouter = new Router({
  prefix: '/api/organ'
})
//POST /api/organ/create
organRouter.post('/create', async ctx => {
  ctx.body = await AddOrgan(ctx.request.body)
})
//GET /api/organ/list?count=count&since=since
organRouter.get('/list', async ctx => {
  ctx.body = await listOrganRequest(ctx.query.count, ctx.query.since);
})
//GET /api/organ/:_id
organRouter.get('/:_id', async ctx => {
  ctx.body = await getOrgan(ctx.params._id)
})
//PUT /api/organ/:_id
organRouter.put('/:_id', async ctx=> {
  ctx.body = await editOrgan(ctx.params._id,ctx.request.body)
})
//DELETE /api/organ/:_id
organRouter.delete('/:_id', async ctx=>{
  ctx.body = await deleteOrgan(ctx.params._id)
})