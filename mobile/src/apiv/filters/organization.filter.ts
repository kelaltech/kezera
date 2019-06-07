import { IOrganizationRequest, IOrganizationResponse } from '../organization.apiv'
import { accountResponseToRequest } from './account.filter'

export async function organizationResponseToRequest(
  response: IOrganizationResponse
): Promise<IOrganizationRequest> {
  return {
    account: await accountResponseToRequest(response.account),

    type: response.type,

    motto: response.motto,
    bio: response.bio,
    locations: response.locations,
    website: response.website,

    funding: {
      bankAccount: response.funding.bankAccount,
      payPalMeId: response.funding.payPalMeId
    },

    licensedNames: response.licensedNames,
    registrations: response.registrations
  }
}

export function organizationRequestToResponse(
  oldResponse: IOrganizationResponse,
  request: IOrganizationRequest
): IOrganizationResponse {
  const { type, motto, bio, locations, website, funding } = request

  return {
    ...oldResponse,

    // account: override n/a

    type,

    motto,
    bio,
    locations,
    website,

    funding

    // licensedNames: override n/a
    // registrations: override n/a
  }
}
