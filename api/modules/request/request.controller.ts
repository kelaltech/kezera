import { IRequestType, RequestModel } from '../../models/request/request.model'
import { add, edit, get, list, remove, search } from '../../lib/crud'
import { Document, Schema } from 'mongoose'
import { IAccount } from '../../models/account/account.model'
import { Stream } from 'stream'
import { Grid } from '../../lib/grid'
import { serverApp } from '../../index'
import { AddTask } from '../task/task.controller'
import { AddFund, editFund } from '../fundraising/fundraising.controller'
import { AddMaterial, UpdateMaterial } from '../material/material.controller'
import { AddOrgan } from '../organ/organ.controller'
import { IRequestResponse } from './request.apiv'
import { IVolunteerResponse } from '../volunteer/volunteer.apiv'
import { VolunteerModel } from '../../models/volunteer/volunteer.model'
import { accountDocumentToPublicResponse } from '../account/account.filter'
import { requestDocumentToResponse } from './request.filter'
import * as sharp from 'sharp'
import { FundraisingModel } from '../../models/fundraising/fundraising.model'
import { MaterialModel } from '../../models/material/material.model'
import { TaskModel } from '../../models/task/task.model'
import { OrganModel } from '../../models/organ/organ.model'

type ObjectId = Schema.Types.ObjectId | string

export async function removeRequest(id: Schema.Types.ObjectId | string): Promise<void> {
  const req = await get(RequestModel, id)
  if (req.type === 'Fundraising') {
    await FundraisingModel.findOneAndDelete({ request: req._id })
  }
  if (req.type === 'Material') {
    await MaterialModel.findOneAndDelete({ request: req._id })
  }
  if (req.type === 'Organ') {
    await OrganModel.findOneAndDelete({ request: req._id })
  }
  if (req.type === 'Task') {
    await TaskModel.findOneAndDelete({ request: req._id })
  }
  await remove(RequestModel, id)
}

export async function getRequest(request_id: ObjectId): Promise<IRequestResponse> {
  return requestDocumentToResponse(await get(RequestModel, request_id))
}

export async function getRequestCover(request_id: ObjectId): Promise<Stream> {
  const grid = new Grid(serverApp, RequestModel, request_id)
  return grid.get()
}

export async function getRequestFile(
  request_id: ObjectId,
  filename: string
): Promise<Stream> {
  const grid = new Grid(serverApp, RequestModel, request_id, 'file')
  return grid.get(filename)
}

export async function searchRequest(term: any): Promise<any> {
  return Promise.all(
    (await search(RequestModel, term)).map(request => requestDocumentToResponse(request))
  )
}

export async function listRequests(): Promise<any> {
  return Promise.all(
    (await list(RequestModel)).map(request => requestDocumentToResponse(request))
  )
}
export async function listMyRequests(id: any): Promise<any> {
  return Promise.all(
    (await list(RequestModel, {
      preQuery: model => model.find({ _by: id })
    })).map(request => requestDocumentToResponse(request))
  )
}

export async function listRequestByType(type: IRequestType) {
  return Promise.all(
    (await list(RequestModel, {
      conditions: {
        type: type
      }
    })).map(request => requestDocumentToResponse(request))
  )
}


export async function addRequestWithPicture(
  data: any,
  account: Document & IAccount,
  pic: any
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
  const compressedPic = sharp(pic.path)
    .resize(1080, 1080, { fit: 'cover' })
    .jpeg({ quality: 100 })

  await grid.set(compressedPic, 'image/jpeg')
  // await grid.set(pic)

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
  return Promise.all(requests.map(request => requestDocumentToResponse(request)))
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
