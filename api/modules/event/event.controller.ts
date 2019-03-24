import { EventModel } from '../../models/event/event.model'
import { add, get, list, remove, search } from '../../lib/crud'
import { Schema } from 'mongoose'
import { Grid } from '../../lib/grid'
import { Stream } from 'stream'
import { serverApp } from '../../index'
import { OrganizationModel } from '../../models/organization/organization.model'
import { commentModel } from '../../models/comment/comment.model'
import { KoaError } from '../../lib/koa-error'

export async function removeEvent(
  id: Schema.Types.ObjectId,
  orgId: Schema.Types.ObjectId
): Promise<void> {
  let event = await get(EventModel, id)
  if (event.organizationId == orgId) await remove(EventModel, id)
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

export async function attendedUsers(eventId: Schema.Types.ObjectId): Promise<any> {
  const event = await get(EventModel, eventId)
  //@ts-ignore
  let volunteers = await get(VolunteerModel, event.attendedVolunteers)
  console.log(volunteers)
  return volunteers
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

export async function addEventWithPicture(
  body: any,
  orgId: Schema.Types.ObjectId,
  pic: Stream
) {
  const organization = await get(OrganizationModel, orgId)
  const event = await add(EventModel, body)
  const grid = new Grid(serverApp, EventModel, event._id)
  organization.events.push({
    //@ts-ignore
    eventId: event._id
  })
  //@ts-ignore
  await Promise.all([grid.add(pic, pictureId), doc.save(), organization.save()])
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
