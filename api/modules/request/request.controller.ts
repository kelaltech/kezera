import { IRequest, RequestModel } from '../../models/request/request.model'
import { add, edit, get, list, remove, search } from '../../lib/crud'
import { Document, Schema } from 'mongoose'
import { IAccount } from '../../models/account/account.model'
import { Stream } from 'stream'
import { Grid } from '../../lib/grid'
import { serverApp } from '../../index'
import { AddTask, getTask } from '../task/task.controller'
import { AddFund, editFund, getFund } from '../fundraising/fundraising.controller'
import { AddMaterial, GetMaterial, UpdateMaterial } from '../material/material.controller'
import { organizationDocumentToResponse } from '../organization/organization.filter'
import { AddOrgan, getOrgan } from '../organ/organ.controller'
import { OrganizationModel } from '../../models/organization/organization.model'
import { IRequestResponse } from './request.apiv'
import { IVolunteerResponse } from '../volunteer/volunteer.apiv'
import { VolunteerModel } from '../../models/volunteer/volunteer.model'
import { accountDocumentToPublicResponse } from '../account/account.filter'

type ObjectId = Schema.Types.ObjectId | string

export async function removeRequest(id: Schema.Types.ObjectId | string): Promise<void> {
  await remove(RequestModel, id)
}

export async function populateRequest(
  request: IRequest & Document
): Promise<IRequestResponse> {
  const ret = request.toJSON()
  ret.picture = '/api/request/picture/' + request._id

  switch (ret.type) {
    case 'Task':
      ret.task = await getTask(request._id)
      break
    case 'Fundraising':
      ret.fundraising = await getFund(request._id)
      break
    case 'Organ':
      ret.organ = await getOrgan(request._id)
      break
  }

  ret._by = await organizationDocumentToResponse(
    await get(OrganizationModel, null, { conditions: { account: request._by } })
  )

  return ret
}

export async function getRequest(_id: ObjectId): Promise<any> {
  const request = await get(RequestModel, _id, {
    postQuery: query =>
      query.populate({ path: 'volunteers', populate: { path: 'account' } })
  })
  console.log(JSON.stringify(request.donations))

  const ret = request.toJSON()
  ret.picture = '/api/request/picture/' + request._id

  switch (ret.type) {
    case 'Task':
      ret.task = await getTask(request._id)
      break
    case 'Fundraising':
      ret.fundraising = await getFund(request._id)
      break
    case 'Organ':
      ret.organ = await getOrgan(request._id)
      break
  }

  ret._by = await organizationDocumentToResponse(
    await get(OrganizationModel, null, { conditions: { account: request._by } })
  )

  for (let i = 0; i < request.donations.length; i++) {
    ;(request.donations[i] as any).account = (await accountDocumentToPublicResponse(
      (request.donations[i] as any).account
    )) as any
  }

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
        case 'Material':
          ret.task = await GetMaterial(request._id)
          break
        case 'Organ':
          ret.fundraising = await getOrgan(request._id)
          break
      }
      console.log(ret)

      return ret
    })
  )
}

export async function addRequestWithPicture(
  data: any,
  account: Document & IAccount,
  pic: Stream
): Promise<ObjectId> {
  data._by = await account._id
  const request = await add(RequestModel, data)

  switch (data.type) {
    case 'Fundraising':
      await AddFund(JSON.parse(data.Fundraising), request._id)
      break
    case 'Material':
      await AddMaterial(JSON.parse(data.Material), request._id)
      break
    case 'Task':
      await AddTask(JSON.parse(data.Task), request._id)
      break
    case 'Organ':
      await AddOrgan(JSON.parse(data.Organ), request._id)
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
    case 'Material':
      await UpdateMaterial(request._id, JSON.parse(data.Task))
      break
  }
  const grid = new Grid(serverApp, RequestModel, request._id)
  await grid.set(pic)
}

export async function listRequestVolunteers(
  request_id: ObjectId
): Promise<IVolunteerResponse[]> {
  let request = await get(RequestModel, request_id, {
    postQuery: query =>
      query.populate({ path: 'volunteers', populate: { path: 'account' } })
  })
  for (let i = 0; i < request.donations.length; i++) {
    ;(request.donations[i] as any).account = (await accountDocumentToPublicResponse(
      (request.donations[i] as any).account
    )) as any
  }
  return request.donations as any
}

export async function listRequestsMe(account_id: ObjectId): Promise<IRequestResponse[]> {
  let requests = await list(RequestModel, { conditions: { volunteers: account_id } })
  return Promise.all(requests.map(request => populateRequest(request)))
}

export async function toggleRequestVolunteer(
  request_id: ObjectId,
  account_id: ObjectId
): Promise<IRequestResponse> {
  let request = await get(RequestModel, request_id)
  let volunteer = await get(VolunteerModel, null, { conditions: { account: account_id } })

  if (request.donations.map(v => v.toString()).includes(volunteer._id.toString())) {
    request.donations.splice(request.donations.indexOf(volunteer._id), 1)
  } else {
    request.donations.push(volunteer._id)
  }

  await edit(RequestModel, request._id, request.toJSON())

  return getRequest(request._id)
}
