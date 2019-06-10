import { EventModel, IEvent } from '../../models/event/event.model'
import { add, edit, get, list, remove, search } from '../../lib/crud'
import { Document, Schema } from 'mongoose'
import { Grid } from '../../lib/grid'
import { Stream } from 'stream'
import { serverApp } from '../../index'
import { commentModel, IComment } from '../../models/comment/comment.model'
import { KoaError } from '../../lib/koa-error'
import { AccountModel, IAccount } from '../../models/account/account.model'
import { getComment } from '../comment/comment.methods'
import * as sharp from 'sharp'
import { IAccountRequest } from '../account/account.apiv'
import { EventResponse } from './event.filter'
import { VolunteerModel } from '../../models/volunteer/volunteer.model'
export async function removeEvent(
  id: Schema.Types.ObjectId | string,
  orgId: Schema.Types.ObjectId | string
): Promise<void> {
  let event = await get(EventModel, id)
  if (event.organizationId.toString() === orgId.toString()) await remove(EventModel, id)
  else throw new KoaError('Not authorized', 401)
}

export async function getEvent(id: Schema.Types.ObjectId): Promise<any> {
  return await EventResponse(await get(EventModel, id))
}

export async function searchEvent(term: string): Promise<any> {
  let events = await search(EventModel, term)
  let response: any = []
  for (let i = 0; i < events.length; i++) {
    response[i] = await EventResponse(events[i])
  }
  return response
}

export async function getRecentEvents(count: number): Promise<IEvent[]> {
  let events = await list(EventModel, {
    since: Date.now(),
    count
  })
  let response: any = []
  for (let i = 0; i < events.length; i++) {
    response[i] = await EventResponse(events[i])
  }
  return response
}

export async function getOrganizationEvents(
  id: Schema.Types.ObjectId
): Promise<IEvent[]> {
  let events = await list(EventModel, {
    preQuery: model => model.find({ organizationId: id })
  })
  let response: any = []
  for (let i = 0; i < events.length; i++) {
    response[i] = await EventResponse(events[i])
  }
  return response
}

export async function listAllEvents(): Promise<any> {
  let events: IEvent[] = await list(EventModel)
  let response: any = []
  for (let i = 0; i < events.length; i++) {
    response[i] = await EventResponse(events[i])
  }
  return response
}

export async function attendedUsers(
  eventId: Schema.Types.ObjectId,
  body: any
): Promise<any> {
  const event = await get(EventModel, eventId)
  for (let i = 0; i < body.length; i++) {
    //@ts-ignore
    if (body[i].toString() == event.goingVolunteers[i]._id.toString())
      event.goingVolunteers.splice(i, 1)
  }
  event.attendedVolunteers.push(body)
  await event.save()
}

export async function getAttendedUsers(
  eventId: Schema.Types.ObjectId
): Promise<IAccountRequest[]> {
  const event = await get(EventModel, eventId)
  let userId = event.attendedVolunteers
  let users = []
  for (let i = 0; i < userId.length; i++) {
    //@ts-ignore
    users.push(await get(AccountModel, event.attendedVolunteers[i]._id))
  }
  return users
}

export async function attendanceVerifivation(
  eventId: Schema.Types.ObjectId
): Promise<any> {
  const event = await get(EventModel, eventId)
  let volunteers = event.goingVolunteers
  let acc = []
  for (let i = 0; i < volunteers.length; i++) {
    //@ts-ignore
    acc.push(await get(AccountModel, volunteers[i]._id))
  }
  return acc
}

export async function usersLikedAnEvent(id: Schema.Types.ObjectId): Promise<any> {
  let event = await get(EventModel, id)
  let users = []
  for (let i = 0; i < event.likes.length; i++) {
    users.push(await get(AccountModel, event.likes[i].toString()))
  }
  return users
}

export async function getComments(eventId: Schema.Types.ObjectId): Promise<IComment[][]> {
  let event = await get(EventModel, eventId)
  let comments = []
  for (let i = 0; i < event.comments.length; i++) {
    comments.push(await getComment(event.comments[i]))
  }
  return comments
}

export async function addEvent(body: any, orgId: any, ctx: any): Promise<any> {
  const event = await add(EventModel, { ...body, organizationId: orgId })
  console.log(event)
  // @ts-ignore
  const stream = sharp(ctx!.request.files!.image.path)
    .resize(1080, 1080, { fit: 'cover' })
    .jpeg({ quality: 100 })
  const grid = new Grid(serverApp, EventModel, event._id)
  await Promise.all([grid.set(stream)])
  return await EventResponse(event)
}

export async function editEvent(
  id: Schema.Types.ObjectId,
  body: any,
  orgId: Schema.Types.ObjectId,
  ctx: any
): Promise<any> {
  let event = await get(EventModel, id)
  if (event.organizationId.toString() === orgId.toString()) {
    let updated = await edit(EventModel, id, body)
    if (ctx!.request.files!.image != undefined) {
      // @ts-ignore
      const stream = sharp(ctx!.request.files!.image.path)
        .resize(1080, 1080, { fit: 'cover' })
        .jpeg({ quality: 100 })
      await new Grid(serverApp, EventModel, id).remove()
      await new Grid(serverApp, EventModel, id).set(stream)
    }
    console.log(updated)
    return await EventResponse(await get(EventModel, id))
  } else throw new KoaError('Not authorized', 401)
}

export async function addComment(
  id: Schema.Types.ObjectId,
  eventId: Schema.Types.ObjectId,
  body: any
): Promise<void> {
  body.by = id
  let comment = await add(commentModel, body)
  let event = await get(EventModel, eventId)
  event.comments.push(comment._id)
  event.save()
  return
}

export async function getEventPicture(id: Schema.Types.ObjectId): Promise<Stream> {
  return new Grid(serverApp, EventModel, id).get()
}

export async function toggleLike(
  eventId: Schema.Types.ObjectId,
  account: Document & IAccount
): Promise<IEvent> {
  const doc = await get(EventModel, eventId)

  if (doc.likes.length == 0) {
    doc.likes.push(account._id)
    await doc.save()
    return doc
  }

  for (let i = 0; i < doc.likes.length; i++) {
    if (account._id.toString() === doc.likes[i].toString()) {
      await doc.likes.splice(i, 1)
    } else {
      doc.likes.push(account._id)
    }
  }
  await doc.save()
  return doc
}

export async function toggleAttend(
  _id: Schema.Types.ObjectId,
  account: Document & IAccount
): Promise<IEvent> {
  const doc = await get(EventModel, _id)

  if (doc.interestedVolunteers.length == 0) {
    doc.interestedVolunteers.push(account._id)
    await doc.save()
    return doc
  }

  for (let i = 0; i < doc.interestedVolunteers.length; i++) {
    //@ts-ignore
    if (account._id.toString() === doc.interestedVolunteers[i]._id.toString()) {
      await doc.interestedVolunteers.splice(i, 1)
    } else {
      doc.interestedVolunteers.push(account._id)
    }
  }
  await doc.save()
  return doc
}

export async function going(
  _id: Schema.Types.ObjectId,
  account: Document & IAccount
): Promise<{
  goingVolunteers: number
}> {
  const doc = await get(EventModel, _id)

  if (doc.goingVolunteers.length == 0) {
    doc.goingVolunteers.push(account._id)
    await doc.save()
    return {
      goingVolunteers: doc.goingVolunteers.length
    }
  }

  for (let i = 0; i < doc.goingVolunteers.length; i++) {
    //@ts-ignore
    if (account._id.toString() === doc.goingVolunteers[i]._id.toString()) {
      await doc.goingVolunteers.splice(i, 1)
    } else {
      doc.goingVolunteers.push(account._id)
    }
  }
  await doc.save()

  return { goingVolunteers: doc.goingVolunteers.length }
}

export async function isGoing(
  id: Schema.Types.ObjectId,
  userId: Schema.Types.ObjectId
): Promise<any> {
  let event = await get(EventModel, id)
  for (let i = 0; i < event.goingVolunteers.length; i++) {
    //@ts-ignore
    console.log(userId + '---' + event.goingVolunteers[i]._id)
    //@ts-ignore
    if (event.goingVolunteers[i]._id.toString() == userId.toString()) {
      return { going: true }
    }
  }
  return { going: false }
}

export async function isLiked(
  id: Schema.Types.ObjectId,
  userId: Schema.Types.ObjectId
): Promise<any> {
  let event = await get(EventModel, id)
  for (let i = 0; i < event.likes.length; i++) {
    if (event.likes[i] == userId.toString()) {
      return { liked: true }
    }
  }
  return { liked: false }
}

export async function getInterested(id: Schema.Types.ObjectId): Promise<any> {
  let event = await get(EventModel, id)
  let users = []
  for (let i = 0; i < event.interestedVolunteers.length; i++) {
    //@ts-ignore
    users.push(await get(AccountModel, event.interestedVolunteers[i]._id))
  }
  console.log(users)
  return users
}

export async function listLatestEvents(): Promise<IEvent[] | Document> {
  let events = await EventModel.find({}).sort({ _at: 'desc' })
  let response: any = []
  for (let i = 0; events.length; i++) {
    response[i] = await EventResponse(events[i])
  }
  return response
}

export async function upcomingEvents(): Promise<IEvent[] | Document> {
  let events: any = await list(EventModel)
  let now = Date.now()
  let difference: IEventDiff[] = []
  for (let i = 0; i < events.length; i++) {
    difference[i] = {
      _id: events[i]._id,
      difference: events[i]._startDate - now
    }
  }
  let upcoming: IEvent[] = []
  for (let j = 0; j < difference.length; j++) {
    upcoming.push(await get(EventModel, difference[j]._id))
  }
  let response: any = []
  for (let i = 0; i < upcoming.length; i++) {
    response[i] = await EventResponse(upcoming[i])
  }
  return response
}

interface IEventDiff {
  _id: any
  difference: number
}

export async function NearByEvents(account: any, since: any, count: any): Promise<any> {
  const conditions: any = {}
  if (account) {
    const volunteer = await VolunteerModel.findOne({ account: account._id })
    if (volunteer) {
      conditions.subscribers = { $ne: account._id }
    }
  }

  const events: any = await list(EventModel, {
    conditions,
    since,
    count,
    postQuery: (query, s) => {
      if (
        !account ||
        !account.lastLocation.coordinates ||
        !account.lastLocation.coordinates.length
      )
        return query

      return query
        .find({
          'locations.geo': {
            $nearSphere: {
              $geometry: {
                type: 'Point',
                coordinates: account.lastLocation.coordinates,
                $minDistance: 0,
                $maxDistance: 2000
              }
            }
          }
        })
        .session(s)
    }
  })
  return await Promise.all(events.map((event: any) => EventResponse(event)))
}
