import { add, get, list, search } from '../../lib/crud'
import { AccountController } from '../account/account.controller'
import { IAccountRequest } from '../account/account.apiv'
import { VolunteerModel } from '../../models/volunteer/volunteer.model'
import { IAccount } from '../../models/account/account.model'
import { OrganizationModel } from '../../models/organization/organization.model'
import { IVolunteerRequest } from './volunteer.apiv'
import { ClientSession, Document, Schema } from 'mongoose'
import { accountDocumentToPublicResponse } from '../account/account.filter'
import { TaskModel } from '../../models/task/task.model'
import { RequestModel } from '../../models/request/request.model'
import { requestDocumentToResponse } from '../request/request.filter'

export async function RegisterVolunteer(data: IAccountRequest): Promise<any> {
  const doc = await new AccountController().add(undefined, data)

  return await add(VolunteerModel, {
    account: doc._id
  })
}

export async function volunteerInfo(user: Document & IAccount): Promise<any> {
  const ret = (await get(VolunteerModel, null, {
    conditions: { account: user._id },
    postQuery: query => query.populate('account')
  })).toObject()
  ret.account = (await accountDocumentToPublicResponse(ret.account as any)) as any
  return ret
}

export async function getVolunteer(
  volunteer_id: Schema.Types.ObjectId | string,
  session?: ClientSession
): Promise<any> {
  const ret = (await get(VolunteerModel, volunteer_id, {
    session,
    postQuery: query => query.populate('account')
  })).toObject()
  ret.account = (await accountDocumentToPublicResponse(ret.account as any)) as any
  return ret
}

export async function editVolunteerInfo(
  data: IVolunteerRequest,
  user: Document & IAccount
): Promise<any> {
  console.log('volunteer Edit /edit Controller', data)
  return await VolunteerModel.findOneAndUpdate({ account: user._id }, data)
}
export async function subscribedOrganization(account: Document & IAccount) {
  return await OrganizationModel.find({ subscribers: account._id })
}
export async function searchVolunteer(term: string) {
  return await search(VolunteerModel, term, {
    postQuery: p => p.populate('account')
  })
}

export async function getTaskTypes(_type: string): Promise<any> {
  let tasks = await list(TaskModel, {
    preQuery: model => model.find({ type: _type })
  })
  console.log(tasks)
  let request: any = []
  for (let i = 0; i < tasks.length; i++) {
    request.push(
      await requestDocumentToResponse(await get(RequestModel, tasks[i].request))
    )
  }
  return request
}
