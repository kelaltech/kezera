import { Document, Schema } from 'mongoose'

import {
  CertificateModel,
  ICertificate,
  ICertificatePrivacy
} from '../../models/certificate/certificate.model'
import { ICertificateRequest, ICertificateResponse } from './certificate.apiv'

type ObjectId = Schema.Types.ObjectId | string

export async function certificateRequestToLeanDocument(
  request: ICertificateRequest,
  issuedBy: ObjectId, // organization
  defaultPrivacy: ICertificatePrivacy,
  _id?: ObjectId, // certificate
  _last: Date | number = Date.now()
): Promise<ICertificate & { _id?: ObjectId }> {
  const { purpose, description, issuedTo, privacy } = request
  return {
    _id,
    _last,

    purpose,
    description,

    issuedBy,
    issuedTo,

    privacy: privacy || defaultPrivacy
  }
}

export async function certificateRequestToDocument(
  request: ICertificateRequest,
  issuedBy: ObjectId, // organization
  defaultPrivacy: ICertificatePrivacy,
  _id?: ObjectId, // certificate
  _last: Date | number = Date.now()
): Promise<Document & ICertificate> {
  return new CertificateModel(
    await certificateRequestToLeanDocument(request, issuedBy, defaultPrivacy, _id, _last)
  )
}

export async function certificateDocumentToResponse(
  document: Document & ICertificate
): Promise<ICertificateResponse> {
  const { _id, _at, purpose, description, issuedBy, issuedTo, privacy } = document
  return {
    _id,
    _at: new Date(_at!).getTime(),

    purpose,
    description,

    issuedBy: issuedBy.toString(),
    issuedTo: issuedTo.toString(),

    privacy: privacy!
  }
}
