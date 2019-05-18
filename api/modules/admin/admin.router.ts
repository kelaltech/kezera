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
  GetVerifierPicture,
  GetVerifiedOrganization
} from './admin.controller'
import { transact } from '../../lib/transact'
import * as fs from 'fs'
import { authorize } from '../../lib/middlewares/authorize'

export const adminRouter = new Router({ prefix: '/api/admin' })

// /api/admin/organization
adminRouter.get('/organization', authorize(['ADMIN']), async ctx => {
  console.log('Getting organizations')
  ctx.body = await GetAllOrganizations()
})

// /api/admin/verifier/list
adminRouter.get('/verifier/list', authorize(['ADMIN']), async ctx => {
  ctx.body = await GetAllVerifiers()
})

// /api/admin/verifier/add
adminRouter.post('/verifier/add', authorize(['ADMIN']), async ctx => {
  console.log(ctx.request.body.data)
  ctx.body = await transact(s => {
    return AddVerifier(
      s,
      JSON.parse(ctx.request.body.data),
      fs.createReadStream(ctx.request.files!.image.path)
    )
  })
})

// /api/admin/verifier/search
adminRouter.get('/verifier/search', authorize(['ADMIN']), async ctx => {
  console.log(ctx.query.term)
  ctx.body = await SearchVerifier(ctx.query.term)
})

// /api/admin/verifier/:_id
adminRouter.get('/verifier/:_id', authorize(['ADMIN']), async ctx => {
  console.log('ID ')
  ctx.body = await GetVerifier(ctx.params._id)
})

// /api/admin/verifier/:_id/verified
adminRouter.get('/verifier/organizations/:_id', async ctx => {
  console.log('was here')
  ctx.body = await GetVerifiedOrganization(ctx.params._id)
})

// /api/admin/verifier/:_id
adminRouter.delete('/verifier/:_id', authorize(['ADMIN']), async ctx => {
  ctx.body = await DeleteVerifier(ctx.params._id)
})

// /api/admin/verifier/pic/:_id
adminRouter.get('/verifier/pic/:_id', authorize(['ADMIN']), async ctx => {
  ctx.body = await GetVerifierPicture(ctx.params._id)
})

// /api/admin/verifier/:_id
adminRouter.put('/verifier/:_id', authorize(['ADMIN']), async ctx => {
  ctx.body = await UpdateVerifier(ctx.params._id, ctx.request.body)
})

// /api/admin/organization/ngo
adminRouter.get('/organization/ngo', authorize(['ADMIN']), async ctx => {
  ctx.body = await GetNGOOrganization()
})

// /api/admin/organization/private
adminRouter.get('/organization/private', authorize(['ADMIN']), async ctx => {
  ctx.body = await GetPrivateOrganization()
})

// /api/admin/organization/governmental
adminRouter.get('/organization/governmental', authorize(['ADMIN']), async ctx => {
  ctx.body = await GetGovernmentalOrganization()
})

// /api/admin/organization/hospitals
adminRouter.get('/organization/hospitals', authorize(['ADMIN']), async ctx => {
  ctx.body = await GetHospital()
})

// /api/admin/volunteers
adminRouter.get('/volunteers', authorize(['ADMIN']), async ctx => {
  ctx.body = await GetVolunteers()
})

// /api/admin/events
adminRouter.get('/events', authorize(['ADMIN']), async ctx => {
  ctx.body = await GetEvents()
})

// /api/admin/news
adminRouter.get('/news', authorize(['ADMIN']), async ctx => {
  ctx.body = await GetNews()
})

// /api/admin/donations/task
adminRouter.get('/donations/task', authorize(['ADMIN']), async ctx => {
  ctx.body = await GetTask()
})

// /api/admin/donations/organ
adminRouter.get('/donations/organ', authorize(['ADMIN']), async ctx => {
  ctx.body = await GetOrgan()
})

// /api/admin/donations/material
adminRouter.get('/donations/material', authorize(['ADMIN']), async ctx => {
  ctx.body = await GetMaterial()
})

// /api/admin/donations/fundraising
adminRouter.get('/donations/fundraising', authorize(['ADMIN']), async ctx => {
  ctx.body = await GetFundraising()
})

// /api/admin/news/likes
adminRouter.get('/news/likes', authorize(['ADMIN']), async ctx => {
  ctx.body = await GetNewsLikes()
})

// /api/admin/news/comment
adminRouter.get('/news/comments', authorize(['ADMIN']), async ctx => {
  ctx.body = await GetNewsComments()
})

// /api/admin/events/comment
adminRouter.get('/events/comments', authorize(['ADMIN']), async ctx => {
  ctx.body = await GetEventsComments()
})

// /api/admin/events/likes
adminRouter.get('/events/likes', authorize(['ADMIN']), async ctx => {
  ctx.body = await GetEventsLikes()
})

// /api/admin/events/goingVolunteers
adminRouter.get('/events/goingVolunteers', authorize(['ADMIN']), async ctx => {
  ctx.body = await GetEventsGoingUsers()
})

// /api/admin/events/intrested
adminRouter.get('/events/interested', authorize(['ADMIN']), async ctx => {
  ctx.body = await GetEventsInterestedUsers()
})

// /api/admin/events/intrested
adminRouter.get('/events/attended', authorize(['ADMIN']), async ctx => {
  ctx.body = await GetEventsAttendedUsers()
})

// /api/admin/volunteer/joined
adminRouter.get('/volunteer/joined', authorize(['ADMIN']), async ctx => {
  ctx.body = await GetJoinedDates()
})

// /api/admin/organization/location
adminRouter.get('/organization/location', authorize(['ADMIN']), async ctx => {
  console.log('Getting location')
  ctx.body = await GetOrganizationLocation(ctx.query.location)
})
