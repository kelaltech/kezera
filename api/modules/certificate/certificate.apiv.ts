import { ICertificatePurpose } from '../../models/certificate/certificate.model'

export type ICertificateRequest = {
  purpose: ICertificatePurpose
  description: string

  issuedTo: string // volunteer

  public?: boolean // true by default
}

export type ICertificateResponse = {
  _id: string
  _at?: number

  purpose: ICertificatePurpose
  description: string

  issuedBy: string // organization
  issuedTo: string // volunteer

  public?: boolean // true by default
}
