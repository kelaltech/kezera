import { Document, Schema } from 'mongoose'

import { IOrganizationRequest, IOrganizationResponse } from './organization.apiv'
import {
  IOrganization,
  OrganizationModel
} from '../../models/organization/organization.model'
import { accountDocumentToResponse } from '../account/account.filter'
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
  const populatedAccount: Document & IAccount = (await document
    .populate('account')
    .execPopulate()).account as any

  return {
    _id: document._id,

    account: await accountDocumentToResponse(populatedAccount),

    type: document.type,

    motto: document.motto,
    bio: document.bio,
    locations: document.locations,
    website: document.website,

    subscribers: document.subscribers.map(subscriber => subscriber.toString()),

    licensedNames: document.licensedNames,
    registrations: document.registrations
  }
}
