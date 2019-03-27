import { Document, Schema } from 'mongoose'

import { IOrganizationRequest, IOrganizationPrivateResponse } from './organization.apiv'
import {
  IOrganization,
  OrganizationModel
} from '../../models/organization/organization.model'

type ObjectId = Schema.Types.ObjectId | string

export async function organizationRequestToLeanDocument(
  request: IOrganizationRequest,
  _id?: ObjectId,
  _last: Date | number = Date.now()
): Promise<any> {
  console.log(request) // todo: temp
  return {
    _id,
    _last

    // todo
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
): Promise<IOrganizationPrivateResponse> {
  console.log(document) // todo: temp
  return {
    _id: document._id

    // todo
  }
}
