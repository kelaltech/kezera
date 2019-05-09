import { RequestModel } from '../../models/request/request.model'
import { add, get, list, remove, search } from '../../lib/crud'
import { Document, Schema } from 'mongoose'
import { AccountModel, IAccount } from '../../models/account/account.model'
import { Stream } from 'stream'
import { Grid } from '../../lib/grid'
import { serverApp } from '../../index'
import { AddTask, getTask } from '../task/task.controller'
import { AddFund, editFund, getFund } from '../fundraising/fundraising.controller'
import { VolunteerModel } from '../../models/volunteer/volunteer.model'
import { AddMaterial, UpdateMaterial } from '../material/material.controller'
import { organizationDocumentToResponse } from '../organization/organization.filter'
import { TaskModel } from '../../models/task/task.model'
import { AddOrgan } from '../organ/organ.controller'
import { OrganizationModel } from '../../models/organization/organization.model'

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
      await AddOrgan(JSON.parse(data.Organ))
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
export async function attended(taskId: Schema.Types.ObjectId, body: any): Promise<any> {
  const task = await get(TaskModel, taskId)
  for (let i = 0; i < body.length; i++) {
    //@ts-ignore
    if (body[i].toString() == task.going[i]._id.toString()) task.going.splice(i, 1)
  }
  task.attended.push(body)
  await task.save()
}
export async function getAttended(id: Schema.Types.ObjectId): Promise<any> {
  const task = await get(RequestModel, id)
  let userId = task.attended
  let users = []
  for (let i = 0; i < userId.length; i++) {
    //@ts-ignore
    users.push(await get(AccountModel, task.attended[i]._id))
  }
  return users
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
}

export async function going(
  _id: Schema.Types.ObjectId,
  account: Document & IAccount
): Promise<{
  going: number
}> {
  const doc = await get(RequestModel, _id)

  if (doc.goingVolunteers.length == 0) {
    doc.goingVolunteers.push(account._id)
    await doc.save()
    return {
      going: doc.goingVolunteers.length
    }
  }

  for (let i = 0; i < doc.goingVolunteers.length; i++) {
    //@ts-ignore
    if (account._id.toString() === doc.goingVolunteers[i]._id.toString()) {
      await doc.goingVolunteers.splice(i, 1)
    } else {
      doc.goingVolunteers.push(account._id)
    }
  }
  await doc.save()

  return { going: doc.goingVolunteers.length }
}

export async function isGoing(
  id: Schema.Types.ObjectId,
  userId: Schema.Types.ObjectId
): Promise<any> {
  let task = await get(RequestModel, id)
  for (let i = 0; i < task.goingVolunteers.length; i++) {
    //@ts-ignore
    if (task.going[i]._id.toString() == userId.toString()) {
      return { going: true }
    }
  }
  return { going: false }
}
