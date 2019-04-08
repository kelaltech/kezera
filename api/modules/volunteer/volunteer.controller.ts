import { add, search } from '../../lib/crud'
import { AccountController } from '../account/account.controller'
import { IAccountRequest } from '../account/account.apiv'
import { VolunteerModel } from '../../models/volunteer/volunteer.model'
import { IAccount } from '../../models/account/account.model'
import { OrganizationModel } from '../../models/organization/organization.model'

export async function RegisterVolunteer(data: IAccountRequest): Promise<any> {
  const doc = await new AccountController().add(undefined, data)

  return await add(VolunteerModel, {
    account: doc._id
  })
}

export async function subscribedOrganization(account: IAccount) {
  return await OrganizationModel.find({ subscribers: account._id })
}
export async function searchVolunteer(term: string) {
  return await search(VolunteerModel, term)
}
