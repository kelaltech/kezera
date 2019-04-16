import { Document, Schema } from 'mongoose'

import { IOrganizationRequest, IOrganizationResponse } from './organization.apiv'
import {
  IOrganization,
  OrganizationModel
} from '../../models/organization/organization.model'
import {
  accountDocumentToPublicResponse,
  accountRequestToDocument
} from '../account/account.filter'
import { IAccount } from '../../models/account/account.model'

type ObjectId = Schema.Types.ObjectId | string

export async function organizationRequestToLeanDocument(
  request: IOrganizationRequest,
  verifier: ObjectId,
  _id?: ObjectId,
  _last: Date | number = Date.now()
): Promise<
  IOrganization & {
    _id?: ObjectId
    account: Document & IAccount
  }
> {
  return {
    _id,
    _last,

    // handle account manually
    account: (await accountRequestToDocument(
      request.account,
      'ACTIVE',
      'ORGANIZATION'
    )) as any,

    type: request.type,

    motto: request.motto,
    bio: request.bio,
    locations: request.locations,
    website: request.website,

    licensedNames: request.licensedNames,
    registrations: request.registrations,
    verifier
  }
}

export async function organizationRequestToDocument(
  request: IOrganizationRequest,
  verifier: ObjectId,
  _id?: ObjectId,
  _last: Date | number = Date.now()
): Promise<Document & IOrganization> {
  return new OrganizationModel(
    await organizationRequestToLeanDocument(request, verifier, _id, _last)
  )
}

export async function organizationDocumentToResponse(
  document: Document & IOrganization,
  account?: Document & IAccount,
  isApplication = false
): Promise<IOrganizationResponse> {
  const populatedAccount: Document & IAccount =
    account ||
    ((await document.populate('account').execPopulate()).account as any).toJSON()

  return {
    _at: new Date(document._at!).getTime(),
    _id: document._id,

    account: await accountDocumentToPublicResponse(populatedAccount),

    type: document.type,

    logoUri: !isApplication
      ? `/api/account/get-photo/${populatedAccount._id}`
      : `/api/verifier/get-organization-application-logo/${document._id}`,
    motto: document.motto,
    bio: document.bio,
    locations: document.locations,
    website: document.website,

    subscribersCount: (document.subscribers || []).length,

    licensedNames: document.licensedNames || [],
    registrations: document.registrations || []
  }
}
