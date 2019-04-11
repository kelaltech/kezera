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
  GetHospital,
  GetEventsLikes,
  GetEventsGoingUsers,
  GetEventsAttendedUsers,
  GetEventsInterestedUsers,
  GetNewsLikes,
  GetNewsComments,
  GetOrganizationLocation,
  GetEventsComments,
  SearchVerifier,
  GetJoinedDates,
  GetVerifierPicture
} from './admin.controller'
import { transact } from '../../lib/transact'
import * as fs from 'fs'

export const adminRouter = new Router({ prefix: '/api/admin' })

// /api/admin/organization
adminRouter.get('/organization', async ctx => {
  console.log('Getting organizations')
  ctx.body = await GetAllOrganizations()
})

// /api/admin/verifier/list
adminRouter.get('/verifier/list', async ctx => {
  ctx.body = await GetAllVerifiers()
})

// /api/admin/verifier/add
adminRouter.post('/verifier/add', async ctx => {
  console.log('Adding a verifier')
  ctx.body = await transact(s => {
    return AddVerifier(
      s,
      ctx.request.body,
      fs.createReadStream(ctx.request.files!.image.path)
    )
  })
})

// /api/admin/verifier/:_id
adminRouter.get('/verifier/:_id', async ctx => {
  ctx.body = await GetVerifier(ctx.params._id)
})

// /api/admin/verifier/:_id
adminRouter.delete('/verifier/:_id', async ctx => {
  ctx.body = await DeleteVerifier(ctx.params._id)
})

// /api/admin/verifier/pic/:_id
adminRouter.get('/verifier/pic/:_id', async ctx => {
  ctx.body = await GetVerifierPicture(ctx.params._id)
})

// /api/admin/verifier/:_id
adminRouter.put('/verifier/:_id', async ctx => {
  ctx.body = await UpdateVerifier(ctx.params._id, ctx.request.body)
})

// /api/admin/organization/ngo
adminRouter.get('/organization/ngo', async ctx => {
  ctx.body = await GetNGOOrganization()
})

// /api/admin/organization/private
adminRouter.get('/organization/private', async ctx => {
  ctx.body = await GetPrivateOrganization()
})

// /api/admin/organization/governmental
adminRouter.get('/organization/governmental', async ctx => {
  ctx.body = await GetGovernmentalOrganization()
})

// /api/admin/organization/hospitals
adminRouter.get('/organization/hospitals', async ctx => {
  ctx.body = await GetHospital()
})

// /api/admin/volunteers
adminRouter.get('/volunteers', async ctx => {
  ctx.body = await GetVolunteers()
})

// /api/admin/events
adminRouter.get('/events', async ctx => {
  ctx.body = await GetEvents()
})

// /api/admin/news
adminRouter.get('/news', async ctx => {
  ctx.body = await GetNews()
})

// /api/admin/donations/task
adminRouter.get('/donations/task', async ctx => {
  ctx.body = await GetTask()
})

// /api/admin/donations/organ
adminRouter.get('/donations/organ', async ctx => {
  ctx.body = await GetOrgan()
})

// /api/admin/donations/material
adminRouter.get('/donations/material', async ctx => {
  ctx.body = await GetMaterial()
})

// /api/admin/donations/fundraising
adminRouter.get('/donations/fundraising', async ctx => {
  ctx.body = await GetFundraising()
})

// /api/admin/news/likes
adminRouter.get('/news/likes', async ctx => {
  ctx.body = await GetNewsLikes()
})

// /api/admin/news/comment
adminRouter.get('/news/comments', async ctx => {
  ctx.body = await GetNewsComments()
})

// /api/admin/events/comment
adminRouter.get('/events/comments', async ctx => {
  ctx.body = await GetEventsComments()
})

// /api/admin/events/likes
adminRouter.get('/events/likes', async ctx => {
  ctx.body = await GetEventsLikes()
})

// /api/admin/events/going
adminRouter.get('/events/going', async ctx => {
  ctx.body = await GetEventsGoingUsers()
})

// /api/admin/events/intrested
adminRouter.get('/events/interested', async ctx => {
  ctx.body = await GetEventsInterestedUsers()
})

// /api/admin/events/intrested
adminRouter.get('/events/attended', async ctx => {
  ctx.body = await GetEventsAttendedUsers()
})

// /api/admin/verifier/search
adminRouter.get('/verifier/search', async ctx => {
  console.log(ctx.query.term)
  ctx.body = await SearchVerifier(ctx.query.term)
})

// /api/admin/volunteer/joined
adminRouter.get('/volunteer/joined', async ctx => {
  ctx.body = await GetJoinedDates()
})

// /api/admin/organization/location
adminRouter.get('/organization/location', async ctx => {
  console.log('Getting location')
  ctx.body = await GetOrganizationLocation(ctx.query.location)
})
