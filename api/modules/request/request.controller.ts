import { RequestModel } from '../../models/request/request.model'
import { add, get, list, remove, search } from '../../lib/crud'
import { Schema } from 'mongoose'
import { Grid } from '../../lib/grid'
import { Stream } from 'stream'
import { serverApp } from '../../index'
import { OrganizationModel } from '../../models/organization/organization.model'

export async function removeRequest(id: Schema.Types.ObjectId): Promise<void> {
  await remove(RequestModel, id)
}

export async function getRequest(id: Schema.Types.ObjectId): Promise<any> {
  return await get(RequestModel, id)
}

export async function searchRequest(term: any): Promise<any> {
  return await search(RequestModel, term)
}

export async function listRequests(): Promise<any> {
  return await list(RequestModel)
}

export async function goingVolunteers(requestId: Schema.Types.ObjectId): Promise<any> {
  const request = await get(RequestModel, requestId)
  //@ts-ignore
  let volunteers = await get(VolunteerModel, request.goingVolunteers)
  console.log(volunteers)
  return volunteers
}

export async function addRequestWithPicture(
  body: any,
  orgId: Schema.Types.ObjectId,
  pic: Stream
) {
  const organization = await get(OrganizationModel, orgId)
  const request = await add(RequestModel, body)
  const grid = new Grid(serverApp, RequestModel, request._id)
  organization.requests.push({
    //@ts-ignore
    requestId: request._id
  })
  //@ts-ignore
  await Promise.all([grid.add(pic, pictureId), doc.save(), organization.save()])
}
