import {
  ICertificatePrivacy,
  ICertificatePurpose
} from '../../models/certificate/certificate.model'

export type ICertificateRequest = {
  purpose: ICertificatePurpose
  description: string

  issuedTo: string // volunteer

  privacy?: ICertificatePrivacy
}

export type ICertificateResponse = {
  _id: string
  _at?: number

  purpose: ICertificatePurpose
  description: string

  issuedBy: string // organization
  issuedTo: string // volunteer

  privacy: ICertificatePrivacy // true by default
}
