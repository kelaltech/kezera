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
  _id?: ObjectId,
  _last: Date | number = Date.now()
): Promise<any> {
  return {
    _id,
    _last,

    // handle account manually
    account: await accountRequestToDocument(request.account, 'ACTIVE', 'ORGANIZATION'),

    type: request.type,

    motto: request.motto,
    bio: request.bio,
    locations: request.locations,
    website: request.website,

    licensedNames: request.licensedNames,
    registrations: request.registrations
  }
}

export async function organizationRequestToDocument(
  request: IOrganizationRequest,
  _id?: ObjectId,
  _last: Date | number = Date.now()
): Promise<Document & IOrganization> {
  return new OrganizationModel(
    await organizationRequestToLeanDocument(request, _id, _last)
  )
}

export async function organizationDocumentToResponse(
  document: Document & IOrganization
): Promise<IOrganizationResponse> {
  const populatedAccount: Document & IAccount = ((await document
    .populate('account')
    .execPopulate()).account as any).toJSON()

  return {
    _id: document._id,

    account: await accountDocumentToPublicResponse(populatedAccount),

    type: document.type,

    logoUri: `/api/organization/get-photo/${document._id}`,
    motto: document.motto,
    bio: document.bio,
    locations: document.locations,
    website: document.website,

    subscribersCount: document.subscribers.length,

    licensedNames: document.licensedNames,
    registrations: document.registrations
  }
}
