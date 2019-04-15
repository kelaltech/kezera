import { RequestModel } from '../../models/request/request.model'
import { add, get, list, remove, search } from '../../lib/crud'
import { Document, Schema } from 'mongoose'
import { IAccount } from '../../models/account/account.model'
import { Stream } from 'stream'
import { Grid } from '../../lib/grid'
import { serverApp } from '../../index'
import { AddTask, getTask } from '../task/task.controller'
import { AddFund, editFund, getFund } from '../fundraising/fundraising.controller'
import { VolunteerModel } from '../../models/volunteer/volunteer.model'
import { organizationDocumentToResponse } from '../organization/organization.filter'
import { OrganizationModel } from '../../models/organization/organization.model'

type ObjectId = Schema.Types.ObjectId | string

export async function removeRequest(id: Schema.Types.ObjectId): Promise<void> {
  await remove(RequestModel, id)
}

export async function getRequest(_id: ObjectId): Promise<any> {
  const request = (await get(RequestModel, _id, {
    postQuery: (async (doc: any) => doc.populate('_by')) as any
  })) as any
  const ret = request.toJSON()
  ret.picture = '/api/request/picture/' + request._id

  switch (ret.type) {
    case 'Task':
      ret.task = await getTask(request._id)
      break
    case 'Fundraising':
      ret.fundraising = await getFund(request._id)
      break
  }

  ret._by = await organizationDocumentToResponse(request._by)

  return ret
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

  return Promise.all(
    requests.map(async request => {
      const ret = request.toJSON()
      ret.picture = '/api/request/picture/' + request._id

      switch (ret.type) {
        case 'Task':
          ret.task = await getTask(request._id)
          break
        case 'Fundraising':
          ret.fundraising = await getFund(request._id)
          break
      }
      console.log(ret)

      return ret
    })
  )
}

export async function goingVolunteers(requestId: Schema.Types.ObjectId): Promise<any> {
  const request = await get(RequestModel, requestId)
  //@ts-ignore
  let volunteers = await get(VolunteerModel, request.goingVolunteers)
  console.log(volunteers)
  return volunteers
}

export async function addRequest(data: any, account: Document & IAccount): Promise<any> {
  data._by = await account._id
  return await add(RequestModel, data)
}

export async function addRequestWithPicture(
  data: any,
  account: Document & IAccount,
  pic: Stream
): Promise<ObjectId> {
  const organization = await get(OrganizationModel, null, {
    conditions: { account: account!._id }
  })

  data._by = await organization._id
  const request = await add(RequestModel, data)

  switch (data.type) {
    case 'Fundraising':
      await AddFund(JSON.parse(data.Fundraising), request._id)
      break
    case 'Task':
      await AddTask(JSON.parse(data.Task), request._id)
      break
  }

  const grid = new Grid(serverApp, RequestModel, request._id)

  await grid.set(pic)

  return request._id
}

export async function editRequest(
  _id: Schema.Types.ObjectId,
  data: any,
  account: Document & IAccount,
  pic: Stream
): Promise<any> {
  data._by = await account._id
  const request = await get(RequestModel, data)

  switch (data.type) {
    case 'Fundraising':
      await editFund(JSON.parse(data.Fundraising), request._id, pic)
      break
    case 'Task':
      await AddTask(JSON.parse(data.Task), request._id)
      break
  }
  const grid = new Grid(serverApp, RequestModel, request._id)
  await grid.set(pic)
}
