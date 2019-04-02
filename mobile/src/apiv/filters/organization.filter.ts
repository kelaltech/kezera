import { IOrganizationRequest, IOrganizationResponse } from '../organization.apiv'
import { accountResponseToRequest } from './account.filter'

export async function organizationPrivateResponseToRequest(
  response: IOrganizationResponse
): Promise<IOrganizationRequest> {
  return {
    account: await accountResponseToRequest(response.account),

    type: response.type,

    motto: response.motto,
    bio: response.bio,
    locations: response.locations,
    website: response.website,

    licensedNames: response.licensedNames,
    registrations: response.registrations
  }
}
