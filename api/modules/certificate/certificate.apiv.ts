import {
  ICertificatePrivacy,
  ICertificatePurpose
} from '../../models/certificate/certificate.model'

export type ICertificateRequest = {
  // purpose (manual)
  description: string

  issuedTo: string // volunteer
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
