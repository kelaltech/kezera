import { add, search } from '../../lib/crud'
import { AccountController } from '../account/account.controller'
import { IAccountRequest } from '../account/account.apiv'
import { VolunteerModel } from '../../models/volunteer/volunteer.model'
import { IAccount } from '../../models/account/account.model'
import { OrganizationModel } from '../../models/organization/organization.model'
import { IVolunteerRequest } from './volunteer.apiv'
import { Document } from 'mongoose'

export async function RegisterVolunteer(data: IAccountRequest): Promise<any> {
  const doc = await new AccountController().add(undefined, data)

  return await add(VolunteerModel, {
    account: doc._id
  })
}

export async function volunteerInfo(user: Document & IAccount): Promise<any> {
  console.log('volunteer Info /me Controller')
  return await VolunteerModel.findOne({ account: user._id })
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
  return await search(VolunteerModel, term)
}
