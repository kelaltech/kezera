import {
  IRequestStatus,
  IRequestType,
  RequestModel
} from '../../models/request/request.model'
import { add, edit, get, list, remove, search } from '../../lib/crud'
import { ClientSession, Document, Schema } from 'mongoose'
import { IAccount } from '../../models/account/account.model'
import { Stream } from 'stream'
import { Grid } from '../../lib/grid'
import { serverApp } from '../../index'
import { AddTask, updateTask } from '../task/task.controller'
import { AddFund, editFund } from '../fundraising/fundraising.controller'
import { AddMaterial, UpdateMaterial } from '../material/material.controller'
import { AddOrgan, editOrgan } from '../organ/organ.controller'
import { IRequestResponse } from './request.apiv'
import { VolunteerModel } from '../../models/volunteer/volunteer.model'
import { accountDocumentToPublicResponse } from '../account/account.filter'
import { requestDocumentToResponse } from './request.filter'
import * as sharp from 'sharp'
import { FundraisingModel } from '../../models/fundraising/fundraising.model'
import { MaterialModel } from '../../models/material/material.model'
import { TaskModel } from '../../models/task/task.model'
import { OrganModel } from '../../models/organ/organ.model'
import { randomBytes } from 'crypto'
import { IAccountPublicResponse } from '../account/account.apiv'
import * as fs from 'fs'

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

export async function addRequestWithPictureAndFile(
  data: any,
  account: Document & IAccount,
  pic: any,
  file: any
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

  if (pic && pic.path) {
    const grid = new Grid(serverApp, RequestModel, request._id)
    const compressedPic = sharp(pic.path)
      .resize(1080, 1080, { fit: 'cover' })
      .jpeg({ quality: 100 })
    await grid.set(compressedPic, 'image/jpeg')
  }

  if (file && file.path) {
    const grid = new Grid(serverApp, RequestModel, request._id, 'file')
    await grid.add(
      fs.createReadStream(file.path),
      `${Math.round(Date.now() * Math.random())}`,
      file.type
    )
  }

  return request._id
}

export async function editRequest(
  _id: Schema.Types.ObjectId,
  data: any,
  account: Document & IAccount,
  pic?: any
): Promise<any> {
  data._by = await account._id
  //const request = await get(RequestModel, data._id)

  switch (data.type) {
    case 'Fundraising':
      await editFund(JSON.parse(data.Fundraising))
      break
    case 'Material':
      await UpdateMaterial(JSON.parse(data.Material))
      break
    case 'Organ':
      await editOrgan(JSON.parse(data.Organ))
      break
    case 'Task':
      await updateTask(JSON.parse(data.Task))
      break
  }
  let requestData = {
    name: data.name,
    description: data.description,
    expires: data.expires
  }
  await edit(RequestModel, data._id, requestData)
  if (pic) {
    console.log('picture is added')
    const grid = new Grid(serverApp, RequestModel, data._id)
    const compressedPic = sharp(pic.path)
      .resize(1080, 1080, { fit: 'cover' })
      .jpeg({ quality: 100 })
    // await grid.remove()
    await grid.set(compressedPic, 'image/jpeg')
  }
}

export async function listRequestVolunteers(
  request_id: ObjectId
): Promise<IAccountPublicResponse[]> {
  let request = await get(RequestModel, request_id, {
    postQuery: query =>
      query.populate({ path: 'donations.volunteer', populate: { path: 'account' } })
  })

  return Promise.all(
    request.donations
      .map(d => (d.volunteer as any).account)
      .map(a => accountDocumentToPublicResponse(a))
  )
}

export async function listRequestsMe(account_id: ObjectId): Promise<IRequestResponse[]> {
  let requests = await list(RequestModel, { conditions: { volunteers: account_id } })
  return Promise.all(requests.map(request => requestDocumentToResponse(request)))
}

export async function addDonnerForMaterial(
  request_id: ObjectId,
  volunteer_id: ObjectId
): Promise<any> {
  const request = await get(RequestModel, request_id)

  if (request.donations.map(i => i.volunteer).includes(volunteer_id)) {
    return {
      volunteer:
        request.donations[request.donations.map(i => i.volunteer).indexOf(volunteer_id)]
    }
  } else {
    const r = randomBytes(4)
      .toString('base64')
      .substr(0, 6)
    const vol = {
      _at: Date.now(),
      volunteer: volunteer_id,
      approved: false,
      data: r
    }
    await request.donations.push(vol)
    await request.save()
    return {
      volunteer: vol
    }
  }
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

export async function applyForTask(
  userId: Schema.Types.ObjectId,
  requestId: Schema.Types.ObjectId
): Promise<any> {
  let request = await get(RequestModel, requestId)
  if (
    request.donations.map(value => value.volunteer.toString()).includes(userId.toString())
  )
    request.donations.splice(
      request.donations.map(value => value.volunteer).indexOf(userId),
      1
    )
  else {
    request.donations.push({ volunteer: userId, approved: true })
  }
  await request.save()
}

export async function pledgeOrgan(
  request_id: string,
  account: IAccount & Document,
  session: ClientSession
): Promise<IRequestResponse> {
  let request = await get(RequestModel, request_id, { session })
  const organ = await get(OrganModel, null, {
    session,
    conditions: { requestId: request._id }
  })
  const volunteer = await get(VolunteerModel, null, {
    session,
    conditions: { account: account._id }
  })

  request.donations.push({
    _at: Date.now(),
    volunteer: volunteer._id,
    approved: true,
    data: ''
  })

  if (request.donations.length >= organ.quantity)
    request.status = 'CLOSED' as IRequestStatus

  await request.save()

  return requestDocumentToResponse(request)
}
