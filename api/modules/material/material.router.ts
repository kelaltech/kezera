import * as Router from 'koa-router'
import {
  DeleteMaterial,
  UpdateMaterial,
  AddMaterial,
  ListMaterials
} from './material.controller'
// import * as fs from 'fs'

export const materialRouter = new Router({ prefix: '/api/event' })

// /api/event/all"
materialRouter.get('/all', async ctx => {
  ctx.body = await ListMaterials()
})
materialRouter.post('/create', async ctx => {
  ctx.body = await AddMaterial(ctx.request.body, ctx.state.user._id)
})
materialRouter.put('/_id', async ctx => {
  ctx.body = await UpdateMaterial(ctx.params._id, ctx.request.body, ctx.state.user._id)
})
materialRouter.delete('/:_id', async ctx => {
  ctx.body = await DeleteMaterial(ctx.params._id, ctx.state.user._id)
})
