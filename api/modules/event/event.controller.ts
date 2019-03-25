import { EventModel } from '../../models/event/event.model'
import { add, edit, get, list, remove, search } from '../../lib/crud'
import { Schema } from 'mongoose'
import { Grid } from '../../lib/grid'
import { Stream } from 'stream'
import { serverApp } from '../../index'
import { commentModel } from '../../models/comment/comment.model'
import { KoaError } from '../../lib/koa-error'
import { AccountModel } from '../../models/account/account.model'

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
  console.log(body)
  event.attendedVolunteers.push(body)
  //console.log(event.attendedVolunteers);
  await event.save()
  console.log(event)
  //@ts-ignore
  // let volunteers = await get(VolunteerModel, event.attendedVolunteers)
  // console.log(volunteers)
  // return volunteers;
}

export async function getAttendedUsers(eventId: Schema.Types.ObjectId): Promise<any> {
  const event = await get(EventModel, eventId)
  console.log(event)
  let userId = event.attendedVolunteers
  let users = []
  for (let i = 0; i < userId.length; i++) {
    console.log(userId[i])
    //@ts-ignore
    users.push(await get(AccountModel, event.attendedVolunteers[i]._id))
  }
  return users
}

export async function attendanceVerifivation(
  eventId: Schema.Types.ObjectId
): Promise<any> {
  const event = await get(EventModel, eventId)
  //@ts-ignore
  // let volunteers = await get(VolunteerModel, event.attendedVolunteers)
  let volunteers = [
    { id: '5c9794bebc16190784b86bf1' },
    { id: '5c97f2c7b33c7c2250d7010f' }
  ]
  let acc = []
  for (let i = 0; i < volunteers.length; i++) {
    acc.push(await get(AccountModel, volunteers[i].id))
  }
  console.log(acc)
  console.log(event)
  return acc
}

export async function interestedUsers(eventId: Schema.Types.ObjectId): Promise<any> {
  const event = await get(EventModel, eventId)
  //@ts-ignore
  let volunteers = await get(VolunteerModel, event.interested)
  console.log(volunteers)
  return volunteers
}

export async function usersLikedAnEvent(eventId: Schema.Types.ObjectId): Promise<any> {
  const event = await get(EventModel, eventId)
  //@ts-ignore
  let volunteers = await get(VolunteerModel, event.likes)
  console.log(volunteers)
  return volunteers
}

export async function getComments(eventId: Schema.Types.ObjectId): Promise<any> {
  //todo comments
  return await get(EventModel, eventId)
}

export async function addEvent(body: any, orgId: any, pic: Stream) {
  //const organization = await get(AccountModel, orgId)
  body.organizationId = orgId
  const event = await add(EventModel, body)
  console.log(event)
  const grid = new Grid(serverApp, EventModel, event._id)
  /*organization.events.push({
    //@ts-ignore
    eventId: event._id
  })*/
  await Promise.all([grid.set(pic)])
}
export async function editEvent(
  id: Schema.Types.ObjectId,
  body: any,
  orgId: Schema.Types.ObjectId,
  pic: Stream
): Promise<any> {
  let event = await get(EventModel, id)
  if (event.organizationId.toString() === orgId.toString()) {
    await edit(EventModel, id, body)
    await new Grid(serverApp, EventModel, id).remove()
    await new Grid(serverApp, EventModel, id).set(pic)
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
