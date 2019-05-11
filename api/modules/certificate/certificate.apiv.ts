import {
  ICertificatePrivacy,
  ICertificatePurpose
} from '../../models/certificate/certificate.model'

export type ICertificateRequest = {
  issueTo: string[] // volunteers
  description: string
}

export type ICertificateResponse = {
  _id: string
  _at?: number

  purpose: ICertificatePurpose
  description: string

  issuedBy: string // organization
  issuedTo: string // volunteer

  privacy: ICertificatePrivacy // true by default

  printUri: string
}
