import { RequestModel } from '../../models/request/request.model'
import { add, edit, get, list, remove, search } from '../../lib/crud'
import { Document, Schema } from 'mongoose'
import { IAccount } from '../../models/account/account.model'
import { Stream } from 'stream'
import { Grid } from '../../lib/grid'
import { serverApp } from '../../index'
import { AddTask, getTask } from '../task/task.controller'
import { AddFund, editFund, getFund } from '../fundraising/fundraising.controller'
import { AddMaterial, UpdateMaterial } from '../material/material.controller'
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

export async function getRequest(_id: ObjectId): Promise<any> {
  const request = await get(RequestModel, _id)

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

export async function addRequest(data: any, account: Document & IAccount): Promise<any> {
  data._by = await account._id
  return await add(RequestModel, data)
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

/*export async function attended(
  requestId: Schema.Types.ObjectId,
  body: any
): Promise<any> {
  const request = await get(RequestModel, requestId)
  for (let i = 0; i < body.length; i++) {
    //@ts-ignore
    if (body[i].toString() == request.goingVolunteers[i]._id.toString())
      request.goingVolunteers.splice(i, 1)
  }
  request.attended.push(body)
  await request.save()
}

export async function attendanceVerification(id: Schema.Types.ObjectId): Promise<any> {
  const task = await get(RequestModel, id)
  let volunteers = task.goingVolunteers
  let acc = []
  for (let i = 0; i < volunteers.length; i++) {
    //@ts-ignore
    acc.push(await get(AccountModel, volunteers[i]._id))
  }
  return acc
}*/

export async function listRequestVolunteers(
  request_id: ObjectId
): Promise<IVolunteerResponse[]> {
  let request = await get(RequestModel, request_id)
  for (let i = 0; i < request.volunteers.length; i++) {
    ;(request.volunteers[i] as any).account = (await accountDocumentToPublicResponse(
      (request.volunteers[i] as any).account
    )) as any
  }
  return request.volunteers as any
}

export async function toggleRequestVolunteer(
  request_id: ObjectId,
  account_id: ObjectId
): Promise<IRequestResponse> {
  let request = await get(RequestModel, request_id)
  let volunteer = await get(VolunteerModel, null, { conditions: { account: account_id } })

  if (request.volunteers.includes(volunteer._id)) {
    request.volunteers.splice(request.volunteers.indexOf(volunteer._id), 1)
  } else {
    request.volunteers.push(volunteer._id)
  }

  await edit(RequestModel, request._id, request.toJSON())

  request = await get(RequestModel, request_id, {
    postQuery: query =>
      query.populate({ path: 'volunteers', populate: { path: 'account' } })
  })
  for (let i = 0; i < request.volunteers.length; i++) {
    ;(request.volunteers[i] as any).account = (await accountDocumentToPublicResponse(
      (request.volunteers[i] as any).account
    )) as any
  }
  return request as any
}

// todo
// const doc = await get(RequestModel, _id)
//
// if (doc.volunteers.length == 0) {
//   doc.volunteers.push(account._id)
//   await doc.save()
//   return doc
// }
//
// for (let i = 0; i < doc.volunteers.length; i++) {
//   //@ts-ignore
//   if (account._id.toString() === doc.volunteers[i]._id.toString()) {
//     await doc.volunteers.splice(i, 1)
//   } else {
//     doc.volunteers.push(account._id)
//   }
// }
// await doc.save()
//
// return doc

// todo
// let request = await get(RequestModel, id)
// for (let i = 0; i < request.volunteers.length; i++) {
//   //@ts-ignore
//   if (request.volunteers[i].toString() == userId.toString())
//     return { goingVolunteers: true }
// }
// return {goingVolunteers: false}
