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

export async function removeEvent(
  id: Schema.Types.ObjectId,
  orgId: Schema.Types.ObjectId
): Promise<void> {
  let event = await get(EventModel, id)
  if (event.organizationId.toString() === orgId.toString()) await remove(EventModel, id)
  else throw new KoaError('Not authorized', 401)
}

export async function getEvent(id: Schema.Types.ObjectId): Promise<any> {
  return await get(EventModel, id)
}

export async function searchEvent(term: any): Promise<any> {
  return await search(EventModel, term)
}

export async function listAllEvents(): Promise<any> {
  return await list(EventModel)
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

export async function getAttendedUsers(eventId: Schema.Types.ObjectId): Promise<any> {
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

export async function addEvent(body: any, orgId: any, pic: Stream): Promise<IEvent> {
  body.organizationId = orgId
  const event = await add(EventModel, body)
  console.log(event)
  const grid = new Grid(serverApp, EventModel, event._id)
  await Promise.all([grid.set(pic)])
  return event
}

export async function editEvent(
  id: Schema.Types.ObjectId,
  body: any,
  orgId: Schema.Types.ObjectId,
  pic: Stream
): Promise<IEvent> {
  let event = await get(EventModel, id)
  if (event.organizationId.toString() === orgId.toString()) {
    let updated = await edit(EventModel, id, body)
    await new Grid(serverApp, EventModel, id).remove()
    await new Grid(serverApp, EventModel, id).set(pic)
    return updated
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
  _newsId: Schema.Types.ObjectId,
  account: Document & IAccount
): Promise<{
  likes: number
}> {
  const doc = await get(EventModel, _newsId)

  if (doc.likes.length == 0) {
    doc.likes.push(account._id)
    await doc.save()
    return {
      likes: doc.likes.length
    }
  }

  for (let i = 0; i < doc.likes.length; i++) {
    if (account._id.toString() === doc.likes[i].toString()) {
      await doc.likes.splice(i, 1)
    } else {
      doc.likes.push(account._id)
    }
  }
  await doc.save()

  return { likes: doc.likes.length }
}

export async function toggleAttend(
  _id: Schema.Types.ObjectId,
  account: Document & IAccount
): Promise<{
  interestedVolunteers: number
}> {
  const doc = await get(EventModel, _id)

  if (doc.interestedVolunteers.length == 0) {
    doc.interestedVolunteers.push(account._id)
    await doc.save()
    return {
      interestedVolunteers: doc.interestedVolunteers.length
    }
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

  return { interestedVolunteers: doc.interestedVolunteers.length }
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
    if (event.goingVolunteers[i]._id.toString() == userId.toString()) {
      return { going: true }
    }
  }
  return { going: false }
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
