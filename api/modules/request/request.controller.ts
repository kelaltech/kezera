import { RequestModel } from '../../models/request/request.model'
import { add, edit, get, list, remove, search } from '../../lib/crud'
import { Schema } from 'mongoose'
import { IAccount } from '../../models/account/account.model'
import { Stream } from 'stream'
import { Grid } from '../../lib/grid'
import { serverApp } from '../../index'
import { AddTask, getTask } from '../task/task.controller'
import { AddFund, getFund } from '../fundraising/fundraising.controller'

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

  return requests.map(request => {
    const ret = request.toJSON()
    ret.picture = '/api/request/picture/' + request._id

    switch (ret.type) {
      case 'Task':
        ret.task = getTask(request._id)
        break
      case 'Fundraising':
        ret.fundraising = getFund(request._id)
        break
    }

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
): Promise<ObjectId> {
  data._by = await account._id
  const request = await add(RequestModel, data)

  switch (data.type) {
    case 'Fundraising':
      await AddFund(JSON.parse(data.fundraising), request._id)
      break
    case 'Task':
      await AddTask(JSON.parse(data.task), request._id)
      break
  }

  const grid = new Grid(serverApp, RequestModel, request._id)

  await grid.set(pic)

  return request._id
}

export async function editRequest(
  id: Schema.Types.ObjectId,
  body: any,
  pic: Stream
): Promise<any> {
  await get(RequestModel, id)
  {
    await edit(RequestModel, id, body)
    await new Grid(serverApp, RequestModel, id).remove()
    await new Grid(serverApp, RequestModel, id).set(pic)
  }
}
