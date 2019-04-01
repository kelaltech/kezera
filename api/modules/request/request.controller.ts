import { RequestModel } from '../../models/request/request.model'
import { add, get, list, remove, search } from '../../lib/crud'
import { Schema } from 'mongoose'
import { IAccount } from '../../models/account/account.model'
import { Stream } from 'stream'
import { Grid } from '../../lib/grid'
import { serverApp } from '../../index'

type ObjectId = Schema.Types.ObjectId | string

export async function removeRequest(id: Schema.Types.ObjectId): Promise<void> {
  await remove(RequestModel, id)
}

export async function getRequest(_id: ObjectId): Promise<any> {
  const docs = (await get(RequestModel, _id)) as any
  docs.picture = '/api/request/picture/' + _id
  return docs
}

export async function getPicture(_id: ObjectId): Promise<Stream> {
  const grid = new Grid(serverApp, RequestModel, _id)
  return grid.get()
}

export async function searchRequest(term: any): Promise<any> {
  return await search(RequestModel, term)
}

export async function listRequests(): Promise<any> {
  const requests = await list(RequestModel)

  return requests.map((request: any) => {
    const ret = request.toJSON()
    ret.picture = '/api/request/picture/' + request._id
    return ret
  })
}

export async function goingVolunteers(requestId: Schema.Types.ObjectId): Promise<any> {
  const request = await get(RequestModel, requestId)
  //@ts-ignore
  let volunteers = await get(VolunteerModel, request.goingVolunteers)
  console.log(volunteers)
  return volunteers
}

export async function addRequest(data: any, account: IAccount): Promise<any> {
  data._by = await account._id
  return await add(RequestModel, data)
}

export async function addRequestWithPicture(
  data: any,
  account: IAccount,
  pic: Stream
): Promise<any> {
  data._by = await account._id
  const request = await add(RequestModel, data)

  const grid = new Grid(serverApp, RequestModel, request._id)

  await grid.set(pic)

  return request
}
