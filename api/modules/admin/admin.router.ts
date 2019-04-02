import * as Router from 'koa-router'
import {
  AddVerifier,
  DeleteVerifier,
  GetAllVerifiers,
  GetEvents,
  GetFundraising,
  GetMaterial,
  GetNews,
  GetOrgan,
  GetAllOrganizations,
  GetTask,
  GetVerifier,
  GetVolunteers,
  UpdateVerifier,
  GetNGOOrganization,
  GetGovernmentalOrganization,
  GetPrivateOrganization,
  GetHospital
} from './admin.controller'

export const adminRouter = new Router({ prefix: '/api/admin' })

adminRouter.get('/:_id', async ctx => {
  ctx.body = await GetVerifier(ctx.params._id)
})

adminRouter.get('/verifier/list', async ctx => {
  ctx.body = await GetAllVerifiers()
})

adminRouter.post('/verifier/add', async ctx => {
  ctx.body = await AddVerifier(ctx.request.body)
})

adminRouter.delete('/verifier/:_id', async ctx => {
  ctx.body = await DeleteVerifier(ctx.params._id)
})

adminRouter.put('/verifier/:_id', async ctx => {
  ctx.body = await UpdateVerifier(ctx.params._id, ctx.request.body)
})

adminRouter.get('/organization', async ctx => {
  ctx.body = await GetAllOrganizations()
})

adminRouter.get('/organization/ngo', async ctx => {
  ctx.body = await GetNGOOrganization()
})

adminRouter.get('/organization/private', async ctx => {
  ctx.body = await GetPrivateOrganization()
})

adminRouter.get('/organization/governmental', async ctx => {
  ctx.body = await GetGovernmentalOrganization()
})
adminRouter.get('/organization/hospitals', async ctx => {
  ctx.body = await GetHospital()
})

adminRouter.get('/volunteers', async ctx => {
  ctx.body = await GetVolunteers()
})

adminRouter.get('/events', async ctx => {
  ctx.body = await GetEvents()
})

adminRouter.get('/news', async ctx => {
  ctx.body = await GetNews()
})

adminRouter.get('/donations/task', async ctx => {
  ctx.body = await GetTask()
})

adminRouter.get('/donations/organ', async ctx => {
  ctx.body = await GetOrgan()
})

adminRouter.get('/donations/material', async ctx => {
  ctx.body = await GetMaterial()
})

adminRouter.get('/donations/fundraising', async ctx => {
  ctx.body = await GetFundraising()
})
