import * as Router from 'koa-router'
import {
  DeleteMaterial,
  UpdateMaterial,
  AddMaterial,
  GetMaterialFromRequest,
  ListMaterials
} from './material.controller'
// import * as fs from 'fs'

export const materialRouter = new Router({ prefix: '/api/material' })

materialRouter.get('/all', async ctx => {
  console.log('Getting materials')
  ctx.body = await ListMaterials(ctx.state.user._id)
})

materialRouter.get('/:_id', async ctx => {
  console.log('Getting specific materials')
  ctx.body = await GetMaterialFromRequest(ctx.params._id)
})

materialRouter.post('/create', async ctx => {
  ctx.body = await AddMaterial(ctx.request.body, ctx.state.user._id)
})

materialRouter.put('/_id', async ctx => {
  ctx.body = await UpdateMaterial(ctx.request.body)
})

materialRouter.delete('/:_id', async ctx => {
  ctx.body = await DeleteMaterial(ctx.params._id, ctx.state.user._id)
})
